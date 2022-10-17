import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgIconMail = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M5.25 4A3.262 3.262 0 0 0 2 7.25v9.5A3.262 3.262 0 0 0 5.25 20h13.5A3.261 3.261 0 0 0 22 16.75v-9.5A3.262 3.262 0 0 0 18.75 4H5.25Zm0 1.5h13.5c.975 0 1.75.775 1.75 1.75v.553L12 12.398 3.5 7.803V7.25c0-.975.775-1.75 1.75-1.75ZM3.5 9.508l8.144 4.402a.75.75 0 0 0 .712 0L20.5 9.508v7.242a1.74 1.74 0 0 1-1.75 1.75H5.25a1.74 1.74 0 0 1-1.75-1.75V9.508Z' />
  </svg>
);

export default SvgIconMail;
