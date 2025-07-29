import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconComment = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill='#333025'
      d='M5.25 3.5A3.26 3.26 0 0 0 2 6.75v8.5a3.26 3.26 0 0 0 3.25 3.25H6v2.75c0 .983 1.214 1.59 2 1l5-3.75h5.75A3.26 3.26 0 0 0 22 15.25v-8.5a3.26 3.26 0 0 0-3.25-3.25zm0 1.5h13.5c.975 0 1.75.775 1.75 1.75v8.5A1.74 1.74 0 0 1 18.75 17h-6a.75.75 0 0 0-.45.15l-4.8 3.6v-3a.75.75 0 0 0-.75-.75h-1.5a1.74 1.74 0 0 1-1.75-1.75v-8.5C3.5 5.775 4.275 5 5.25 5m2.5 3.499a.75.75 0 1 0 0 1.5h8.5a.75.75 0 1 0 0-1.5zm0 3.5a.751.751 0 1 0 0 1.5h6.5a.75.75 0 1 0 0-1.5z'
    />
  </svg>
);
export default SvgIconComment;
