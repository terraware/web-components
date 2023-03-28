import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconFolder = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d='M4.25 4A2.261 2.261 0 0 0 2 6.25v11.5A2.261 2.261 0 0 0 4.25 20h15.5A2.261 2.261 0 0 0 22 17.75v-9a2.261 2.261 0 0 0-2.25-2.25h-7.729L9.787 4.638A2.75 2.75 0 0 0 8.026 4H4.25Zm0 1.5h3.776c.293 0 .575.103.8.29l1.752 1.46-1.752 1.46c-.225.187-.507.29-.8.29H3.5V6.25c0-.423.327-.75.75-.75ZM12.021 8h7.729c.423 0 .75.327.75.75v9c0 .423-.327.75-.75.75H4.25a.739.739 0 0 1-.75-.75V10.5h4.526a2.75 2.75 0 0 0 1.76-.638L12.022 8Z'
      fill='#333025'
    />
  </svg>
);
export default SvgIconFolder;
