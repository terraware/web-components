import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconParchment = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M7.75 2.5A3.262 3.262 0 0 0 4.5 5.75v1.877a.75.75 0 0 0 0 .243V16H3.25c-.957 0-1.75.793-1.75 1.75v.5a3.262 3.262 0 0 0 3.25 3.25h11v-.045c1.497-.009 2.75-1.2 2.75-2.705v-4.877a.751.751 0 0 0 0-.243v-3.257a.751.751 0 0 0 0-.243V8.5h2.25c.957 0 1.75-.793 1.75-1.75V5.336c0-1.41-1.034-2.685-2.482-2.823a2.753 2.753 0 0 0-.268-.012V2.5h-12Zm0 1.5h9.56c-.196.376-.31.8-.31 1.25V9.5h-1.75a.75.75 0 1 0 0 1.5H17v2h-2.75a.751.751 0 1 0 0 1.5H17v4.25c0 .74-.608 1.317-1.375 1.244-.632-.06-1.125-.65-1.125-1.33v-.914c0-.957-.793-1.75-1.75-1.75H6V8.5h1.75a.75.75 0 1 0 0-1.5H6V5.75C6 4.775 6.775 4 7.75 4Zm12.125.006c.632.06 1.125.65 1.125 1.33V6.75c0 .148-.102.25-.25.25H18.5V5.25c0-.74.608-1.317 1.375-1.244ZM3.25 17.5h9.5c.148 0 .25.102.25.25v.914c0 .482.156.926.373 1.336H4.75A1.74 1.74 0 0 1 3 18.25v-.5c0-.148.102-.25.25-.25Z' />
  </svg>
);
export default SvgIconParchment;
