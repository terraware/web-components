import { Vec3 } from 'playcanvas';

import { AnnotationCandidateBuffer } from './xr-annotation-candidate-buffer';

interface FakeAnnotationOptions {
  name: string;
  position?: Vec3;
  scale?: number;
  enabled?: boolean;
  openable?: boolean;
}

const fakeAnnotation = ({
  name,
  position = new Vec3(),
  scale = 1,
  enabled = true,
  openable = true,
}: FakeAnnotationOptions) => ({
  name,
  position,
  scale,
  annotationScript: {
    enabled,
    ...(openable ? { onVrOpenCallback: () => undefined } : {}),
  },
  getPosition(): Vec3 {
    return this.position;
  },
  getWorldTransform() {
    return {
      getScale: (out: Vec3) => {
        out.set(this.scale, this.scale, this.scale);

        return out;
      },
    };
  },
});

type FakeAnnotation = ReturnType<typeof fakeAnnotation>;

const fakeApp = (children: FakeAnnotation[]) => ({
  root: { findByName: (name: string) => (name === 'annotations-root' ? { children } : null) },
});

const newBuffer = () => new AnnotationCandidateBuffer((entity: any) => entity.annotationScript);

describe('AnnotationCandidateBuffer', () => {
  it('hands back the same array on every collect, so a per-frame caller allocates nothing', () => {
    const buffer = newBuffer();
    const app = fakeApp([fakeAnnotation({ name: 'annotation-0' })]);

    expect(buffer.collect(app, 1)).toBe(buffer.collect(app, 1));
  });

  it('reuses the candidate objects rather than rebuilding them', () => {
    const buffer = newBuffer();
    const app = fakeApp([fakeAnnotation({ name: 'annotation-0' })]);

    const first = buffer.collect(app, 1)[0];

    expect(first).toBeDefined();
    expect(buffer.collect(app, 1)[0]).toBe(first);
  });

  it('derives the hit radius from the hotspot scale and the pad', () => {
    const buffer = newBuffer();
    const app = fakeApp([fakeAnnotation({ name: 'annotation-0', scale: 3 })]);

    expect(buffer.collect(app, 2)[0].radius).toBeCloseTo(0.5 * 3 * 2);
  });

  it('picks up a hotspot that has moved or resized since the last collect', () => {
    const buffer = newBuffer();
    const annotation = fakeAnnotation({ name: 'annotation-0', position: new Vec3(1, 0, 0) });
    const app = fakeApp([annotation]);

    buffer.collect(app, 1);
    annotation.position = new Vec3(9, 0, 0);
    annotation.scale = 4;
    const candidate = buffer.collect(app, 1)[0];

    expect(candidate.position.x).toBeCloseTo(9);
    expect(candidate.radius).toBeCloseTo(0.5 * 4);
  });

  it('shrinks when an annotation is removed', () => {
    const buffer = newBuffer();
    const children = [fakeAnnotation({ name: 'annotation-0' }), fakeAnnotation({ name: 'annotation-1' })];
    const app = fakeApp(children);

    expect(buffer.collect(app, 1)).toHaveLength(2);
    children.pop();

    expect(buffer.collect(app, 1)).toHaveLength(1);
  });

  it('grows when an annotation is added', () => {
    const buffer = newBuffer();
    const children = [fakeAnnotation({ name: 'annotation-0' })];
    const app = fakeApp(children);

    buffer.collect(app, 1);
    children.push(fakeAnnotation({ name: 'annotation-1' }));

    expect(buffer.collect(app, 1)).toHaveLength(2);
  });

  it('leaves out the excluded entity', () => {
    const buffer = newBuffer();
    const app = fakeApp([fakeAnnotation({ name: 'annotation-0' }), fakeAnnotation({ name: 'annotation-1' })]);

    const candidates = buffer.collect(app, 1, 'annotation-0');

    expect(candidates).toHaveLength(1);
    expect(candidates[0].entity.name).toBe('annotation-1');
  });

  it('keeps unnamed annotations when nothing is excluded', () => {
    const buffer = newBuffer();
    const unnamed = fakeAnnotation({ name: undefined as unknown as string });

    expect(buffer.collect(fakeApp([unnamed]), 1)).toHaveLength(1);
  });

  it('leaves out disabled annotations and ones that cannot be opened', () => {
    const buffer = newBuffer();
    const app = fakeApp([
      fakeAnnotation({ name: 'annotation-0', enabled: false }),
      fakeAnnotation({ name: 'annotation-1', openable: false }),
      fakeAnnotation({ name: 'annotation-2' }),
    ]);

    const candidates = buffer.collect(app, 1);

    expect(candidates).toHaveLength(1);
    expect(candidates[0].entity.name).toBe('annotation-2');
  });

  it('is empty when the annotations root is missing', () => {
    const buffer = newBuffer();

    expect(buffer.collect({ root: { findByName: () => null } }, 1)).toHaveLength(0);
  });
});
