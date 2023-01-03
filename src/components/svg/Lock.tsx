import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLock = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 32 40' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M16 0c-4.4 0-8 3.6-8 8v4H4.5C2.033 12 0 14.033 0 16.5v19C0 37.968 2.033 40 4.5 40h23c2.468 0 4.5-2.032 4.5-4.5v-19c0-2.467-2.032-4.5-4.5-4.5H24V8c0-4.4-3.6-8-8-8Zm0 3c2.78 0 5 2.22 5 5v4H11V8c0-2.78 2.22-5 5-5ZM4.5 15h23c.846 0 1.5.653 1.5 1.5v19c0 .846-.654 1.5-1.5 1.5h-23c-.846 0-1.5-.654-1.5-1.5v-19c0-.847.654-1.5 1.5-1.5ZM16 23a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z' />
  </svg>
);
export default SvgLock;
