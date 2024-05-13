import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconModule = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill='#333025'
      d='M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm2.231 0c.371.413.628.929.724 1.5H19.5V14H8v1.5h13.25a.75.75 0 1 0 0-1.5H21V3.75a.75.75 0 0 0-.75-.75H7.231ZM4 8a1.5 1.5 0 0 0-1.5 1.5v6H7v-6h5.25a.75.75 0 1 0 0-1.5H4Zm.5 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z'
    />
  </svg>
);
export default SvgIconModule;
