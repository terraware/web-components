import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCaretDown = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M21.743 5.99a.75.75 0 0 0-.523.23L12 15.44 2.78 6.22a.75.75 0 1 0-1.06 1.06l9.75 9.75a.75.75 0 0 0 1.06 0l9.75-9.75a.75.75 0 0 0-.537-1.29Z' />
  </svg>
);
export default SvgCaretDown;
