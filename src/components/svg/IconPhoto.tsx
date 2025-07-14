import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconPhoto = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M14.116.6c.859 0 1.849.511 2.332 1.34l1.318 2.26h2.333c2.143 0 3.9 1.757 3.9 3.9v11.4c0 2.142-1.757 3.899-3.9 3.899H3.9A3.914 3.914 0 0 1 0 19.499V8.1C0 5.958 1.758 4.2 3.9 4.2h2.333l1.318-2.26C8.034 1.112 9.006.601 9.863.601zM12 8.868a5.11 5.11 0 1 0 0 10.219 5.11 5.11 0 0 0 0-10.22' />
  </svg>
);
export default SvgIconPhoto;
