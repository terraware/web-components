import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCaretRight = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M7.123 1.49A.75.75 0 0 0 6.6 2.78l9.22 9.22-9.22 9.22a.75.75 0 1 0 1.06 1.06l9.75-9.75a.75.75 0 0 0 0-1.06l-9.75-9.75a.75.75 0 0 0-.537-.228z' />
  </svg>
);
export default SvgCaretRight;
