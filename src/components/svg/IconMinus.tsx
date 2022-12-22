import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgIconMinus = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M3.25 11.25a.751.751 0 1 0 0 1.5h17.5a.75.75 0 1 0 0-1.5H3.25Z' fill='#3A4445' />
  </svg>
);

export default SvgIconMinus;
