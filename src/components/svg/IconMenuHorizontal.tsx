import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgIconMenuHorizontal = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M7.5 12a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm6 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm6 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z' fill='#3A4445' />
  </svg>
);

export default SvgIconMenuHorizontal;