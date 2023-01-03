import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconAdd = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2Zm0 1.5c4.703 0 8.5 3.797 8.5 8.5 0 4.703-3.797 8.5-8.5 8.5A8.489 8.489 0 0 1 3.5 12c0-4.703 3.797-8.5 8.5-8.5Zm-.012 3.49a.75.75 0 0 0-.738.76v3.5h-3.5a.751.751 0 1 0 0 1.5h3.5v3.5a.751.751 0 1 0 1.5 0v-3.5h3.5a.751.751 0 1 0 0-1.5h-3.5v-3.5a.75.75 0 0 0-.762-.76Z' />
  </svg>
);
export default SvgIconAdd;
