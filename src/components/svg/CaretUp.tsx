import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCaretUp = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M11.99 5.75a.75.75 0 0 0-.52.22l-9.75 9.75a.75.75 0 1 0 1.06 1.06L12 7.56l9.22 9.22a.75.75 0 1 0 1.06-1.06l-9.75-9.75a.75.75 0 0 0-.54-.22Z' />
  </svg>
);
export default SvgCaretUp;
