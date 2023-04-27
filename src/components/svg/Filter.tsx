import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFilter = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M4.25 3C3.568 3 3 3.568 3 4.25v1.545c0 1.148.528 2.234 1.43 2.945l5.07 3.995v7.515a.75.75 0 0 0 1.185.61l3.5-2.5a.75.75 0 0 0 .315-.61v-5.016l5.07-3.994A3.752 3.752 0 0 0 21 5.795V4.25C21 3.568 20.432 3 19.75 3H4.25Zm.25 1.5h15v1.295c0 .69-.315 1.34-.857 1.767l-5 3.938h-3.287L5.357 7.562A2.247 2.247 0 0 1 4.5 5.795V4.5ZM11 13h2v4.364l-2 1.429V13Z' />
  </svg>
);
export default SvgFilter;
