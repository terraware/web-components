import { Entity, Quat, Vec3 } from 'playcanvas';

import { adoptSceneCamera } from './camera-adoption';

/** The slice of the scene graph the adoption walks, as plain objects. */
interface FakeEntity {
  name: string;
  camera?: unknown;
  parent: FakeEntity | null;
  children: FakeEntity[];
  localPosition: Vec3;
  localRotation: Quat;
  addChild(child: FakeEntity): void;
  isDescendantOf(node: FakeEntity): boolean;
  findComponent(type: string): { entity: FakeEntity } | null;
  getLocalPosition(): Vec3;
  getLocalRotation(): Quat;
  setLocalPosition(position: Vec3): void;
  setLocalRotation(rotation: Quat): void;
}

const entity = (name: string, options: { camera?: boolean; position?: Vec3 } = {}): FakeEntity => {
  const node: FakeEntity = {
    name,
    camera: options.camera ? { name: `${name}-camera-component` } : undefined,
    parent: null,
    children: [],
    localPosition: options.position ? options.position.clone() : new Vec3(),
    localRotation: new Quat(),
    addChild: (child) => {
      child.parent?.children.splice(child.parent.children.indexOf(child), 1);
      node.children.push(child);
      child.parent = node;
    },
    isDescendantOf: (other) => {
      let current = node.parent;
      while (current) {
        if (current === other) {
          return true;
        }
        current = current.parent;
      }

      return false;
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
    getLocalPosition: () => node.localPosition,
    getLocalRotation: () => node.localRotation,
    setLocalPosition: (position) => {
      node.localPosition = position;
    },
    setLocalRotation: (rotation) => {
      node.localRotation = rotation;
    },
  };

  return node;
};

const adopt = (root: FakeEntity, rig: FakeEntity, ownCamera: FakeEntity) =>
  adoptSceneCamera(root as unknown as Entity, rig as unknown as Entity, ownCamera as unknown as Entity);

/**
 * A host scene holding the only camera, with the walkthrough's rig mounted alongside it. This is
 * the `camera={null}` case.
 */
const buildHostScene = () => {
  const root = entity('root');
  const hostCamera = entity('camera', { camera: true, position: new Vec3(0, 1.3, 0.5) });
  const rig = entity('camera-root');
  const ownCamera = entity('camera');
  root.addChild(hostCamera);
  root.addChild(rig);
  rig.addChild(ownCamera);

  return { root, hostCamera, rig, ownCamera };
};

describe('adoptSceneCamera', () => {
  it('moves the scene camera under the rig', () => {
    const { root, hostCamera, rig, ownCamera } = buildHostScene();

    const adopted = adopt(root, rig, ownCamera);

    expect(adopted).not.toBeNull();
    expect(hostCamera.parent).toBe(rig);
    // The rig's XR scripts resolve the head with findComponent on the rig itself.
    expect(rig.findComponent('camera')?.entity).toBe(hostCamera);
  });

  it('reports the camera it adopted, which is the one the viewer has to drive and project from', () => {
    const { root, hostCamera, rig, ownCamera } = buildHostScene();

    expect(adopt(root, rig, ownCamera)?.camera).toBe(hostCamera as unknown as Entity);
  });

  it('keeps the camera where it is when the viewer owns one', () => {
    const { root, hostCamera, rig } = buildHostScene();
    const ownCamera = entity('camera', { camera: true });
    rig.addChild(ownCamera);

    expect(adopt(root, rig, ownCamera)).toBeNull();
    expect(hostCamera.parent).toBe(root);
  });

  it('does nothing when the scene has no camera at all', () => {
    const root = entity('root');
    const rig = entity('camera-root');
    const ownCamera = entity('camera');
    root.addChild(rig);
    rig.addChild(ownCamera);

    expect(adopt(root, rig, ownCamera)).toBeNull();
  });

  it('leaves a camera the rig hangs off alone', () => {
    // A host that mounted the walkthrough inside its own camera entity: reparenting would make a
    // cycle, and the camera is already an ancestor of everything the rig moves.
    const root = entity('root');
    const hostCamera = entity('camera', { camera: true });
    const rig = entity('camera-root');
    const ownCamera = entity('camera');
    root.addChild(hostCamera);
    hostCamera.addChild(rig);
    rig.addChild(ownCamera);

    expect(adopt(root, rig, ownCamera)).toBeNull();
    expect(hostCamera.parent).toBe(root);
  });

  it('puts the camera back where it was when released', () => {
    const { root, hostCamera, rig, ownCamera } = buildHostScene();

    const adopted = adopt(root, rig, ownCamera);
    // A session overwrites the camera's local pose with the head pose every frame, so by the time
    // the walkthrough closes it holds a head pose rather than the host's authored one.
    hostCamera.setLocalPosition(new Vec3(4, 1.6, -7));
    adopted?.release();

    expect(hostCamera.parent).toBe(root);
    expect(hostCamera.getLocalPosition()).toEqual(new Vec3(0, 1.3, 0.5));
  });
});
