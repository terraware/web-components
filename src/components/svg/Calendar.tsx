import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCalendar = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M18.133 1.891a2.978 2.978 0 0 0-2.119-.882h-1a1 1 0 1 0-2 0l-6-.009a1 1 0 0 0-2 0h-1a3 3 0 0 0-3 3v1.992l-.023 9.994a3 3 0 0 0 2.995 3l12 .018a3 3 0 0 0 3-3l.018-12a2.98 2.98 0 0 0-.87-2.113ZM4.01 2.991h1a1 1 0 0 0 2 0l6 .009a1 1 0 0 0 2 0h1a1 1 0 0 1 1 1v.987l-14-.021v-.987a1 1 0 0 1 1-.988Zm11.982 14.018-12-.018a1 1 0 0 1-1-1l.01-9.014L17 7l-.014 9.012a1 1 0 0 1-.996.997Z' />
  </svg>
);
export default SvgCalendar;
