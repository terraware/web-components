import React, { useEffect } from 'react';

import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';
import { useApp } from '@playcanvas/react/hooks';
import { Vec3 } from 'playcanvas';

import { BoundaryWallScript } from './boundary-wall';

export type BoundaryWallProps = {
  /** World-space, i.e. already multiplied by the scene scaleFactor. */
  center: Vec3;
  radius: number;
  groundPlane: Vec3[];
  baseY: number;
};

const BoundaryWall = ({ center, radius, groundPlane, baseY }: BoundaryWallProps) => {
  const app = useApp();

  useEffect(() => {
    // Set imperatively rather than via reactive Script props. @playcanvas/react wraps Script
    // in memo() whose shallowEquals returns early on the first prop with a .equals() method
    // (Vec3), so any prop after a Vec3 is never compared and would not propagate.
    // @ts-expect-error - scripts are added dynamically to the entity
    const script = app.root.findByName('boundary-wall')?.script?.boundaryWall;
    if (script) {
      script.center = center;
      script.radius = radius;
      script.groundPlane = groundPlane;
      script.baseY = baseY;
      script.rebuild();
    }
  }, [app, center, radius, groundPlane, baseY]);

  return (
    <Entity name='boundary-wall'>
      <Script script={BoundaryWallScript} />
    </Entity>
  );
};

export default BoundaryWall;
