import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgIconArrowRight = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d='M13.242 4.492a.75.75 0 0 0-.522 1.288l5.72 5.72H3.75a.751.751 0 1 0 0 1.5h14.69l-5.72 5.72a.75.75 0 1 0 1.06 1.06l7-7a.75.75 0 0 0 0-1.06l-7-7a.75.75 0 0 0-.538-.228Z'
      fill='#3A4445'
    />
  </svg>
);

export default SvgIconArrowRight;
