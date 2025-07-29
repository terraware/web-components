import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgClose = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M19.743 3.49a.75.75 0 0 0-.523.23L12 10.94 4.78 3.72a.75.75 0 1 0-1.06 1.06L10.94 12l-7.22 7.22a.75.75 0 1 0 1.06 1.06L12 13.06l7.22 7.22a.75.75 0 1 0 1.06-1.06L13.06 12l7.22-7.22a.75.75 0 0 0-.537-1.29' />
  </svg>
);
export default SvgClose;
