import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCritical = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2Zm0 1.5c4.703 0 8.5 3.797 8.5 8.5 0 4.703-3.797 8.5-8.5 8.5A8.489 8.489 0 0 1 3.5 12c0-4.703 3.797-8.5 8.5-8.5Zm-4.25 6c-.957 0-1.75.793-1.75 1.75v1.5c0 .957.793 1.75 1.75 1.75h8.5c.957 0 1.75-.793 1.75-1.75v-1.5c0-.957-.793-1.75-1.75-1.75h-8.5Zm0 1.5h8.5c.148 0 .25.102.25.25v1.5c0 .148-.102.25-.25.25h-8.5a.239.239 0 0 1-.25-.25v-1.5c0-.148.102-.25.25-.25Z' />
  </svg>
);
export default SvgCritical;
