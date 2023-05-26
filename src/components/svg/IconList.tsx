import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconList = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M3.75 2.5c-.682 0-1.25.568-1.25 1.25v3C2.5 7.432 3.068 8 3.75 8h3C7.432 8 8 7.432 8 6.75v-3c0-.682-.568-1.25-1.25-1.25h-3ZM4 4h2.5v2.5H4V4Zm6.25.5a.75.75 0 1 0 0 1.5h10.5a.75.75 0 1 0 0-1.5h-10.5Zm-6.5 4.75c-.682 0-1.25.568-1.25 1.25v3c0 .682.568 1.25 1.25 1.25h3c.682 0 1.25-.568 1.25-1.25v-3c0-.682-.568-1.25-1.25-1.25h-3Zm.25 1.5h2.5v2.5H4v-2.5Zm6.25.5a.751.751 0 1 0 0 1.5h10.5a.751.751 0 1 0 0-1.5h-10.5ZM3.75 16c-.682 0-1.25.568-1.25 1.25v3c0 .682.568 1.25 1.25 1.25h3c.682 0 1.25-.568 1.25-1.25v-3C8 16.568 7.432 16 6.75 16h-3ZM4 17.5h2.5V20H4v-2.5Zm6.25.5a.751.751 0 1 0 0 1.5h10.5a.751.751 0 1 0 0-1.5h-10.5Z' />
  </svg>
);
export default SvgIconList;
