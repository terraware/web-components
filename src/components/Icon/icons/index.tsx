import React from 'react';
import { ReactComponent as Lock } from './lock.svg';
import { ReactComponent as Spinner } from './spinner.svg';

export type IconName = 'lock' | 'spinner';

type SVGComponent = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
>;
const icons: Record<IconName, SVGComponent> = {
  lock: Lock,
  spinner: Spinner,
};

export default icons;
