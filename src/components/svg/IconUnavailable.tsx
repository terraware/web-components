import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconUnavailable = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M8 1.333A6.674 6.674 0 0 0 1.333 8 6.674 6.674 0 0 0 8 14.667 6.674 6.674 0 0 0 14.666 8 6.674 6.674 0 0 0 8 1.333m0 1c1.386 0 2.638.515 3.621 1.338l-7.95 7.95C2.848 10.638 2.333 9.386 2.333 8A5.66 5.66 0 0 1 8 2.333m4.329 2.045c.823.984 1.337 2.235 1.337 3.622A5.66 5.66 0 0 1 8 13.667c-1.387 0-2.638-.515-3.621-1.338z' />
  </svg>
);
export default SvgIconUnavailable;
