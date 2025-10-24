import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconDashboard = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2m0 1.5c4.703 0 8.5 3.797 8.5 8.5s-3.797 8.5-8.5 8.5A8.49 8.49 0 0 1 3.5 12c0-4.703 3.797-8.5 8.5-8.5m0 .75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5M7.05 6.3a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m9.9 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m.299 3.308c-1.145-.019-5.186 1.283-5.632 1.468a1 1 0 0 0 .766 1.848c.51-.212 5.372-2.71 5.16-3.22-.026-.064-.13-.093-.294-.096M5 11.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m14 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5M7.05 16.2a.75.75 0 1 0 0 1.499.75.75 0 0 0 0-1.5m9.9 0a.75.75 0 1 0 0 1.499.75.75 0 0 0 0-1.5' />
  </svg>
);
export default SvgIconDashboard;
