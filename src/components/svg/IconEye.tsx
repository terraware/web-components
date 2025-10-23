import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconEye = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M11.993 4.5c-5.66 0-10.647 3.923-11.97 9.064a.75.75 0 1 0 1.454.373C2.617 9.507 7.033 6 11.993 6s9.39 3.508 10.53 7.937a.75.75 0 0 0 1.454-.373C22.653 8.421 17.653 4.5 11.993 4.5m.008 4a4.843 4.843 0 0 0-4.832 4.832A4.844 4.844 0 0 0 12 18.165a4.845 4.845 0 0 0 4.833-4.833A4.844 4.844 0 0 0 12.001 8.5m0 1.5a3.32 3.32 0 0 1 3.333 3.332 3.32 3.32 0 0 1-3.333 3.333 3.32 3.32 0 0 1-3.332-3.333A3.32 3.32 0 0 1 12 10' />
  </svg>
);
export default SvgIconEye;
