import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgChevronDown = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='m15 8.65-3 3-3-3c-.3-.3-.75-.3-1.05 0L6.9 9.7c-.3.3-.3.75 0 1.05l4.6 4.6c.3.3.75.3 1.05 0l4.6-4.6c.3-.3.3-.75 0-1.05L16.1 8.65c-.35-.3-.8-.3-1.1 0Z' />
  </svg>
);

export default SvgChevronDown;
