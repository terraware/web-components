import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgCaretLeft = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M17.235 1.493a.75.75 0 0 0-.515.227l-9.75 9.75a.75.75 0 0 0 0 1.06l9.75 9.75a.75.75 0 1 0 1.06-1.06L8.56 12l9.22-9.22a.75.75 0 0 0-.545-1.287Z' />
  </svg>
);

export default SvgCaretLeft;
