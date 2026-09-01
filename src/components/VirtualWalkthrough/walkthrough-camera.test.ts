import { Vec3 } from 'playcanvas';

import { WalkthroughCamera } from './walkthrough-camera';

/** The slice of the scene graph the camera script addresses, as plain objects. */
interface FakeEntity {
  name: string;
  camera?: unknown;
  enabled: boolean;
  script: { enabled: boolean };
  parent: FakeEntity | null;
  children: FakeEntity[];
  position: Vec3;
  eulerAngles: Vec3;
  addChild(child: FakeEntity): void;
  findComponent(type: string): { entity: FakeEntity } | null;
  getPosition(): Vec3;
  setPosition(x: number | Vec3, y?: number, z?: number): void;
  setEulerAngles(pitch: number, yaw: number, roll: number): void;
}

const entity = (name: string, options: { camera?: boolean } = {}): FakeEntity => {
  const node: FakeEntity = {
    name,
    camera: options.camera ? { name: `${name}-camera-component` } : undefined,
    enabled: true,
    script: { enabled: true },
    parent: null,
    children: [],
    position: new Vec3(),
    eulerAngles: new Vec3(),
    addChild: (child) => {
      child.parent?.children.splice(child.parent.children.indexOf(child), 1);
      node.children.push(child);
      child.parent = node;
    },
    findComponent: (type) => {
      if (type !== 'camera') {
        return null;
      }
      if (node.camera) {
        return { entity: node };
      }
      for (const child of node.children) {
        const found = child.findComponent(type);
        if (found) {
          return found;
        }
      }

      return null;
    },
    getPosition: () => node.position,
    setPosition: (x, y, z) => {
      node.position = x instanceof Vec3 ? x.clone() : new Vec3(x, y, z);
    },
    setEulerAngles: (pitch, yaw, roll) => {
      node.eulerAngles = new Vec3(pitch, yaw, roll);
    },
  };

  return node;
};

const createScript = (mount: FakeEntity) =>
  new WalkthroughCamera({ app: {}, entity: mount } as unknown as ConstructorParameters<typeof WalkthroughCamera>[0]);

/** A rig with the camera hanging off it, which is where the viewer mounts this script. */
const buildRig = () => {
  const rig = entity('camera-root');
  const camera = entity('camera', { camera: true });
  rig.addChild(camera);

  return { rig, camera, script: createScript(rig) };
};

describe('WalkthroughCamera', () => {
  it('poses the camera under it rather than the entity it is mounted on', () => {
    const { rig, camera, script } = buildRig();

    script.reset(new Vec3(0, 0, 0), new Vec3(1, 2, 3));

    expect(camera.getPosition()).toEqual(new Vec3(1, 2, 3));
    expect(rig.getPosition()).toEqual(new Vec3(0, 0, 0));
  });

  it('walks the camera under it on a key press', () => {
    const { rig, camera, script } = buildRig();
    script.reset(new Vec3(0, 0, -1), new Vec3(0, 0, 0));

    (script as unknown as { _keys: Record<string, boolean> })._keys.KeyW = true;
    script.update(1 / 60);

    expect(camera.getPosition().z).toBeLessThan(0);
    expect(rig.getPosition()).toEqual(new Vec3(0, 0, 0));
  });

  it('orbits the camera under it', () => {
    const { rig, camera, script } = buildRig();
    script.reset(new Vec3(0, 0, 0), new Vec3(4, 0, 0));

    script.orbitStep(90);

    expect(camera.getPosition().x).toBeCloseTo(0);
    expect(camera.getPosition().z).toBeCloseTo(4);
    expect(rig.getPosition()).toEqual(new Vec3(0, 0, 0));
  });

  it('reports a focus point in front of the camera under it', () => {
    const { camera, script } = buildRig();
    script.reset(new Vec3(0, 1.5, -10), new Vec3(0, 1.5, 0));

    const focus = script.focusPoint;

    expect(focus.z).toBeCloseTo(camera.getPosition().z - 1);
  });

  it('poses its own entity when it is the one carrying the camera', () => {
    // The script is exported on its own, so it stays usable mounted straight onto a camera entity.
    const camera = entity('camera', { camera: true });
    const script = createScript(camera);

    script.reset(new Vec3(0, 0, 0), new Vec3(1, 2, 3));

    expect(camera.getPosition()).toEqual(new Vec3(1, 2, 3));
  });

  it('picks up a camera that arrives after it starts, and leaves the rig alone until it does', () => {
    // An adopted camera is reparented into the rig by an effect that runs after the scripts mount.
    // The rig must not be posed in the meantime: an XR session is measured from where it stands.
    const rig = entity('camera-root');
    const script = createScript(rig);
    script.reset(new Vec3(0, 0, 0), new Vec3(1, 2, 3));
    (script as unknown as { _keys: Record<string, boolean> })._keys.KeyW = true;
    script.update(1 / 60);
    script.orbitStep(90);

    expect(rig.getPosition()).toEqual(new Vec3(0, 0, 0));

    const camera = entity('host-camera', { camera: true });
    rig.addChild(camera);
    script.reset(new Vec3(0, 0, 0), new Vec3(4, 5, 6));

    expect(camera.getPosition()).toEqual(new Vec3(4, 5, 6));
    expect(rig.getPosition()).toEqual(new Vec3(0, 0, 0));
  });
});
