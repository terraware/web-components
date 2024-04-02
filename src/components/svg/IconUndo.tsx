import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconUndo = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M8.735 2.993a.75.75 0 0 0-.515.227l-5 5a.75.75 0 0 0 0 1.06l5 5a.75.75 0 1 0 1.06-1.06L5.56 9.5h8.94c2.77 0 5 2.23 5 5s-2.23 5-5 5h-3.75a.751.751 0 1 0 0 1.5h3.75c3.58 0 6.5-2.92 6.5-6.5S18.08 8 14.5 8H5.56l3.72-3.72a.75.75 0 0 0-.545-1.287Z' />
  </svg>
);
export default SvgIconUndo;
