import {
  ADDRESS_CLAMP_TO_EDGE,
  BLEND_NORMAL,
  CULLFACE_NONE,
  FILTER_NEAREST,
  GraphicsDevice,
  Mesh,
  PIXELFORMAT_RGBA8,
  SEMANTIC_POSITION,
  SEMANTIC_TEXCOORD0,
  ShaderMaterial,
  Texture,
} from 'playcanvas';

/** Pie radius as a fraction of the quad's half-extent. */
const PIE_RADIUS = 0.92;

// GLSL only, for the same reason as BoundaryWallScript: @playcanvas/react's Application defaults to
// deviceTypes [DEVICETYPE_WEBGL2], so WGSL variants would never be compiled here.
const pieVertexGLSL = /* glsl */ `
    attribute vec3 vertex_position;
    attribute vec2 aUv0;

    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;

    varying vec2 uv0;

    void main(void) {
        uv0 = aUv0;
        gl_Position = matrix_viewProjection * matrix_model * vec4(vertex_position, 1.0);
    }
`;

/**
 * Draws the progress sweep analytically from `uProgress`, so animating it costs one uniform write
 * per frame.
 *
 * `uMaskMap` carries whatever static artwork sits around the pie, baked once by the caller: red is
 * a mask for a backing disc drawn under the sweep, green a mask for a glyph drawn over it. Callers
 * with no such artwork bind a transparent pixel and get the bare pie.
 */
const pieFragmentGLSL = /* glsl */ `
    uniform float uProgress;
    uniform vec3 uTrackColor;
    uniform float uTrackAlpha;
    uniform vec3 uWedgeColor;
    uniform float uWedgeAlpha;
    uniform vec3 uDiscColor;
    uniform float uDiscAlpha;
    uniform vec3 uGlyphColor;
    uniform sampler2D uMaskMap;

    varying vec2 uv0;

    const float PI = 3.14159265359;
    const float TWO_PI = 6.28318530718;
    const float HALF_PI = 1.57079632679;
    const float PIE_RADIUS = ${PIE_RADIUS};

    /** Source-over composite of a straight-alpha source onto a straight-alpha destination. */
    vec4 over(vec4 dst, vec4 src) {
        float a = src.a + dst.a * (1.0 - src.a);
        if (a <= 0.0) {
            return vec4(0.0);
        }

        return vec4((src.rgb * src.a + dst.rgb * dst.a * (1.0 - src.a)) / a, a);
    }

    void main(void) {
        // The quad's UVs run y-down (v = 0 along the top edge), so centring them gives a coordinate
        // system with +y downward and angles increasing clockwise.
        vec2 p = uv0 * 2.0 - 1.0;
        float d = length(p);

        // Derivatives are undefined in non-uniform control flow, so every fwidth runs before the
        // discard at the end.
        float radiusFeather = fwidth(d);
        float insideDisc = 1.0 - smoothstep(PIE_RADIUS - radiusFeather, PIE_RADIUS + radiusFeather, d);

        // Fraction of a full turn, measured clockwise from 12 o'clock.
        float turn = mod(atan(p.y, p.x) + HALF_PI + TWO_PI, TWO_PI) / TWO_PI;

        // Signed arc-length to the sweep's leading edge, which is smooth either side of that edge and
        // so antialiases cleanly. It jumps at the 12 o'clock seam, where fwidth would blow up and
        // wash the edge out to half coverage, so the feather is capped to keep the smoothstep
        // saturated there instead.
        float edgeDistance = (turn - uProgress) * TWO_PI * d;
        float edgeFeather = min(fwidth(edgeDistance), 0.05);
        float swept = 1.0 - smoothstep(-edgeFeather, edgeFeather, edgeDistance);

        // A pie at zero progress is not started, and should not show even its track.
        float pie = insideDisc * step(0.0001, uProgress);

        vec4 mask = texture2D(uMaskMap, uv0);

        vec4 color = over(vec4(0.0), vec4(uDiscColor, uDiscAlpha * mask.r));
        color = over(color, vec4(uTrackColor, uTrackAlpha * pie));
        color = over(color, vec4(uWedgeColor, uWedgeAlpha * pie * swept));
        color = over(color, vec4(uGlyphColor, mask.g));

        if (color.a <= 0.0) {
            discard;
        }

        gl_FragColor = color;
    }
`;

/** A camera-facing unit quad with y-down UVs, sized to `halfExtent` in local units. */
export const progressPieQuadMesh = (device: GraphicsDevice, halfExtent: number): Mesh => {
  const h = halfExtent;
  const mesh = new Mesh(device);
  mesh.setPositions([-h, -h, 0, h, -h, 0, h, h, 0, -h, h, 0]);
  mesh.setNormals([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
  mesh.setUvs(0, [0, 1, 1, 1, 1, 0, 0, 0]);
  mesh.setIndices([0, 1, 2, 0, 2, 3]);
  mesh.update();

  return mesh;
};

/**
 * A single transparent texel, for pies that carry no static artwork of their own.
 *
 * The filters are set explicitly because the default minification filter samples a mipmap chain,
 * which a single-level texture does not have. That combination is incomplete in WebGL, and what a
 * shader reads from an incomplete texture is not something to rely on.
 */
export const emptyMaskTexture = (device: GraphicsDevice): Texture => {
  const texture = new Texture(device, {
    name: 'xr-progress-pie-empty-mask',
    width: 1,
    height: 1,
    format: PIXELFORMAT_RGBA8,
    mipmaps: false,
    minFilter: FILTER_NEAREST,
    magFilter: FILTER_NEAREST,
    addressU: ADDRESS_CLAMP_TO_EDGE,
    addressV: ADDRESS_CLAMP_TO_EDGE,
  });
  const pixels = texture.lock();
  pixels.set([0, 0, 0, 0]);
  texture.unlock();

  return texture;
};

export interface ProgressPieMaterialOptions {
  uniqueName: string;
  /** Static artwork baked once: red masks a disc under the sweep, green a glyph over it. */
  maskMap: Texture;
  discColor?: [number, number, number];
  discAlpha?: number;
}

/**
 * Material for a progress pie. Everything that animates rides on the `uProgress` uniform, so a
 * running sweep costs one uniform write per frame and no texture work at all.
 */
export const createProgressPieMaterial = ({
  uniqueName,
  maskMap,
  discColor = [0.08, 0.08, 0.08],
  discAlpha = 0,
}: ProgressPieMaterialOptions): ShaderMaterial => {
  const material = new ShaderMaterial({
    uniqueName,
    vertexGLSL: pieVertexGLSL,
    fragmentGLSL: pieFragmentGLSL,
    attributes: { vertex_position: SEMANTIC_POSITION, aUv0: SEMANTIC_TEXCOORD0 },
  });

  material.blendType = BLEND_NORMAL;
  material.cull = CULLFACE_NONE;
  material.depthTest = false;
  material.depthWrite = false;

  material.setParameter('uProgress', 0);
  material.setParameter('uTrackColor', [1, 1, 1]);
  material.setParameter('uTrackAlpha', 0.18);
  material.setParameter('uWedgeColor', [64 / 255, 200 / 255, 1]);
  material.setParameter('uWedgeAlpha', 0.85);
  material.setParameter('uDiscColor', discColor);
  material.setParameter('uDiscAlpha', discAlpha);
  material.setParameter('uGlyphColor', [1, 1, 1]);
  material.setParameter('uMaskMap', maskMap);
  material.update();

  return material;
};
