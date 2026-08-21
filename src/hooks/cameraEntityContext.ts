import { createContext } from 'react';

import { Entity } from 'playcanvas';

/**
 * The camera entity the walkthrough owns, published by `VirtualWalkthroughViewer` for the hooks
 * beneath it.
 *
 * Looking the camera up by name is not safe once the viewer shares a scene graph with a host that
 * has entities of its own: `findByName('camera')` walks the whole graph and returns whichever
 * entity was added first, so a host that names its own camera entity `camera` shadows the viewer's.
 * Null outside a viewer, where the name lookup is still the only thing to go on.
 */
export const CameraEntityContext = createContext<Entity | null>(null);
