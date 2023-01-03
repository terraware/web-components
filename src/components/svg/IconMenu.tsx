import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconMenu = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M2.75 4.5a.75.75 0 1 0 0 1.5h18.5a.75.75 0 1 0 0-1.5H2.75Zm0 6.75a.751.751 0 1 0 0 1.5h18.5a.75.75 0 1 0 0-1.5H2.75Zm0 6.75a.751.751 0 1 0 0 1.5h18.5a.75.75 0 1 0 0-1.5H2.75Z' />
  </svg>
);
export default SvgIconMenu;
