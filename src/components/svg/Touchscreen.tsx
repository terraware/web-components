import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgTouchscreen = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d='M8.25 2A2.261 2.261 0 0 0 6 4.25v15.5A2.261 2.261 0 0 0 8.25 22h7.5A2.261 2.261 0 0 0 18 19.75V4.25A2.261 2.261 0 0 0 15.75 2h-7.5Zm0 1.5h7.5c.423 0 .75.327.75.75v15.5c0 .423-.327.75-.75.75h-7.5a.739.739 0 0 1-.75-.75V4.25c0-.423.327-.75.75-.75ZM12 5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-1.25 12.5a.751.751 0 1 0 0 1.5h2.5a.751.751 0 1 0 0-1.5h-2.5Z'
      fill='#3A4445'
    />
  </svg>
);

export default SvgTouchscreen;