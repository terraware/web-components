import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgIconCheckmark = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d='M21.735 4.493a.75.75 0 0 0-.515.227L8.25 17.69l-5.47-5.47a.751.751 0 0 0-1.29.527.75.75 0 0 0 .23.533l6 6a.75.75 0 0 0 1.06 0l13.5-13.5a.75.75 0 0 0-.545-1.287Z'
      fill='#3A4445'
    />
  </svg>
);

export default SvgIconCheckmark;
