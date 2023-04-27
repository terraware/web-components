import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgChevronUp = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='m9.025 15.35 3-3 3 3c.3.3.75.3 1.05 0l1.05-1.05c.3-.3.3-.75 0-1.05l-4.6-4.6c-.3-.3-.75-.3-1.05 0l-4.6 4.6c-.3.3-.3.75 0 1.05l1.05 1.05c.35.3.8.3 1.1 0Z' />
  </svg>
);
export default SvgChevronUp;
