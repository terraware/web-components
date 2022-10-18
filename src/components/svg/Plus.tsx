import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgPlus = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M11.988 2.49a.75.75 0 0 0-.738.76v8h-8a.751.751 0 1 0 0 1.5h8v8a.751.751 0 1 0 1.5 0v-8h8a.75.75 0 1 0 0-1.5h-8v-8a.75.75 0 0 0-.762-.76Z' />
  </svg>
);

export default SvgPlus;
