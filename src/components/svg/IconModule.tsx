import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconModule = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4m2.231 0c.371.413.628.929.724 1.5H19.5V14H8v1.5h13.25a.75.75 0 1 0 0-1.5H21V3.75a.75.75 0 0 0-.75-.75zM4 8a1.5 1.5 0 0 0-1.5 1.5v6H7v-6h5.25a.75.75 0 1 0 0-1.5H4m.5 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4m5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4' />
  </svg>
);
export default SvgIconModule;
