import React from 'react';

import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';

import { XrExitButton as XrExitButtonScript } from './xr-exit-button';

interface XrExitButtonProps {
  /** Runs instead of ending the XR session when the button is activated. */
  onClose?: () => void;
}

const XrExitButton = ({ onClose }: XrExitButtonProps) => (
  <Entity name='xr-exit-button'>
    <Script script={XrExitButtonScript} onClose={onClose} />
  </Entity>
);

export default XrExitButton;
