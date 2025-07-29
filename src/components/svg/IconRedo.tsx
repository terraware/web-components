import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconRedo = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M15.242 2.992a.75.75 0 0 0-.522 1.288L18.44 8H9.5C5.92 8 3 10.92 3 14.5S5.92 21 9.5 21h3.75a.751.751 0 1 0 0-1.5H9.5c-2.77 0-5-2.23-5-5s2.23-5 5-5h8.94l-3.72 3.72a.75.75 0 1 0 1.06 1.06l5-5a.75.75 0 0 0 0-1.06l-5-5a.75.75 0 0 0-.538-.228' />
  </svg>
);
export default SvgIconRedo;
