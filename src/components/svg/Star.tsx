import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgStar = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23 22' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='m11.412 0 3.386 7.34 8.027.952-5.935 5.488 1.575 7.928-7.053-3.948-7.053 3.948 1.575-7.928-5.935-5.488 8.027-.952z' />
  </svg>
);
export default SvgStar;
