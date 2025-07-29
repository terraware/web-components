import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgKey = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M15 2.5c-3.58 0-6.5 2.92-6.5 6.5 0 .441.091.852.176 1.264L2.72 16.22a.75.75 0 0 0-.22.53v4a.75.75 0 0 0 .75.75h4a.75.75 0 0 0 .75-.75V19.5h1.75a.75.75 0 0 0 .75-.75V17h1.75a.75.75 0 0 0 .75-.75v-1.102c.636.207 1.298.352 2 .352 3.58 0 6.5-2.92 6.5-6.5S18.58 2.5 15 2.5M15 4c2.77 0 5 2.23 5 5s-2.23 5-5 5c-.869 0-1.68-.22-2.39-.607a.75.75 0 0 0-1.11.658V15.5H9.75a.75.75 0 0 0-.75.75V18H7.25a.75.75 0 0 0-.75.75V20H4v-2.94l5.994-5.994a.75.75 0 0 0 .193-.731A4.989 4.989 0 0 1 15 4m1 2.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3' />
  </svg>
);
export default SvgKey;
