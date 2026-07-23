import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconText = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 54 54' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <circle cx={27} cy={27} r={24.5} fill='#EFF5EF' stroke='#2C8658' strokeWidth={5} />
    <path stroke='#2C8658' strokeWidth={3} d='M14 21h25.5M14 28h25.5M19 34h16' />
  </svg>
);
export default SvgIconText;
