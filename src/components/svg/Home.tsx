import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgHome = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M11.976 2a.75.75 0 0 0-.44.161L4.43 7.76A3.752 3.752 0 0 0 3 10.705v9.545c0 .682.568 1.25 1.25 1.25h5c.682 0 1.25-.568 1.25-1.25v-5c0-.148.102-.25.25-.25h2.5c.148 0 .25.102.25.25v5c0 .682.568 1.25 1.25 1.25h5c.682 0 1.25-.568 1.25-1.25v-9.545a3.752 3.752 0 0 0-1.43-2.945L12.464 2.16A.75.75 0 0 0 11.976 2ZM12 3.705l6.643 5.233c.542.428.857 1.077.857 1.767V20H15v-4.75c0-.957-.793-1.75-1.75-1.75h-2.5c-.957 0-1.75.793-1.75 1.75V20H4.5v-9.295c0-.69.315-1.34.857-1.767L12 3.705Z' />
  </svg>
);

export default SvgHome;
