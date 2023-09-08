import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconHistory = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 2a9.989 9.989 0 0 0-8 4.006V4.25a.75.75 0 1 0-1.5 0v3.5a.75.75 0 0 0 .75.75h3.5a.75.75 0 1 0 0-1.5H5.125A8.482 8.482 0 0 1 12 3.5c4.703 0 8.5 3.797 8.5 8.5 0 4.703-3.797 8.5-8.5 8.5A8.489 8.489 0 0 1 3.5 12 .75.75 0 1 0 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10S17.514 2 12 2Zm-.262 4.49a.75.75 0 0 0-.738.76v6a.75.75 0 0 0 .75.75h4a.751.751 0 1 0 0-1.5H12.5V7.25a.75.75 0 0 0-.762-.76Z' />
  </svg>
);
export default SvgIconHistory;
