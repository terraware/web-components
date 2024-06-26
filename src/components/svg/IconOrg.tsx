import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconOrg = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M3.25 2a.75.75 0 1 0 0 1.5h.25v6.018C2.653 9.64 2 10.37 2 11.25v5.5c0 .414.336.75.75.75H5.5V16h-2v-4.75a.25.25 0 0 1 .25-.25h.5a.75.75 0 0 0 .75-.75V3.5h9.5v2H16v-2h.25a.75.75 0 1 0 0-1.5zm5.488 4.49a1 1 0 0 0-.108.01h-.88a.75.75 0 1 0 0 1.5H8v6.05c-.837.129-1.5.83-1.5 1.7v5.5a.75.75 0 0 0 .75.75h14a.75.75 0 0 0 .75-.75v-5.5c0-.87-.663-1.571-1.5-1.7V8h.25a.75.75 0 1 0 0-1.5h-.877a.8.8 0 0 0-.243 0H8.873a1 1 0 0 0-.135-.01M9.5 8H19v6.75a.75.75 0 0 0 .75.75h.5c.148 0 .25.102.25.25v4.75h-5v-3a.5.5 0 0 0-.5-.5h-1.5a.5.5 0 0 0-.5.5v3H8v-4.75c0-.148.102-.25.25-.25h.5a.75.75 0 0 0 .75-.75zm2.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3.5 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM12 13.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3.5 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM10 17a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm7.5 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z' />
  </svg>
);
export default SvgIconOrg;
