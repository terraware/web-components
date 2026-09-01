import { type ReactNode, createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';

import { render } from '@testing-library/react';
import { Entity } from 'playcanvas';

import { useAdoptedCamera } from './useAdoptedCamera';

const mockApp = { root: new Entity('root') };

// Virtual: jest's resolver doesn't follow the package's subpath exports.
jest.mock('@playcanvas/react/hooks', () => ({ useApp: () => mockApp }), { virtual: true });

/**
 * A stand-in for the camera component the host scene's camera carries. Removing it is what
 * destroying the entity does, and losing it is what would leave the host with nothing to render
 * through.
 */
const attachCamera = (entity: Entity) => {
  const component = {
    entity,
    enabled: true,
    system: {
      removeComponent: (target: Entity) => {
        delete (target as unknown as { camera?: unknown }).camera;
        delete target.c.camera;
      },
    },
  };

  (entity as unknown as { camera: unknown }).camera = component;
  entity.c.camera = component as unknown as Entity['c'][string];
};

const ParentContext = createContext<Entity | null>(null);

/**
 * Stands in for `@playcanvas/react`'s Entity, whose whole teardown is the layout effect below: it
 * destroys the entity, and with it every child parented under it — including one the walkthrough
 * adopted from the host scene.
 */
const TestEntity = ({
  name,
  onEntity,
  children,
}: {
  name: string;
  onEntity: (entity: Entity) => void;
  children?: ReactNode;
}) => {
  const parent = useContext(ParentContext) ?? mockApp.root;
  const entity = useMemo(() => new Entity(name), [name]);

  useLayoutEffect(() => {
    parent.addChild(entity);
    onEntity(entity);

    return () => {
      parent.removeChild(entity);
      entity.destroy();
    };
  }, [entity, parent, onEntity]);

  return <ParentContext.Provider value={entity}>{children}</ParentContext.Provider>;
};

/** The viewer's shape where it matters here: the hook, the rig, and the camera entity under it. */
const Walkthrough = () => {
  const [rig, setRig] = useState<Entity | null>(null);
  const [ownCamera, setOwnCamera] = useState<Entity | null>(null);
  useAdoptedCamera(rig, ownCamera);

  return (
    <TestEntity name='camera-root' onEntity={setRig}>
      <TestEntity name='camera' onEntity={setOwnCamera} />
    </TestEntity>
  );
};

describe('useAdoptedCamera', () => {
  let hostCamera: Entity;

  beforeEach(() => {
    mockApp.root = new Entity('root');
    const host = new Entity('host');
    hostCamera = new Entity('camera');
    attachCamera(hostCamera);
    mockApp.root.addChild(host);
    host.addChild(hostCamera);
  });

  it('holds the host camera under the rig while mounted', () => {
    render(<Walkthrough />);

    expect(hostCamera.parent?.name).toBe('camera-root');
  });

  it('hands the camera back before the rig it was parented into is destroyed', () => {
    const { unmount } = render(<Walkthrough />);

    unmount();

    // The host is left rendering through this camera, so it has to outlive the walkthrough.
    expect(hostCamera.camera).toBeTruthy();
    expect(hostCamera.parent?.name).toBe('host');
  });
});
