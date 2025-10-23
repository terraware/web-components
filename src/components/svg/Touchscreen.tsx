import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTouchscreen = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M8.25 2A2.26 2.26 0 0 0 6 4.25v15.5A2.26 2.26 0 0 0 8.25 22h7.5A2.26 2.26 0 0 0 18 19.75V4.25A2.26 2.26 0 0 0 15.75 2zm0 1.5h7.5c.423 0 .75.327.75.75v15.5c0 .423-.327.75-.75.75h-7.5a.74.74 0 0 1-.75-.75V4.25c0-.423.327-.75.75-.75M12 5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m-1.25 12.5a.751.751 0 1 0 0 1.5h2.5a.751.751 0 1 0 0-1.5z' />
  </svg>
);
export default SvgTouchscreen;
