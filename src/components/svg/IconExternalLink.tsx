import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconExternalLink = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M20.735 2.493a1 1 0 0 0-.08.007H13.75a.75.75 0 1 0 0 1.5h5.19l-7.72 7.72a.75.75 0 1 0 1.06 1.06L20 5.06v5.19a.751.751 0 1 0 1.5 0V3.345a.75.75 0 0 0-.765-.852M6.25 4A3.76 3.76 0 0 0 2.5 7.75v10a3.76 3.76 0 0 0 3.75 3.75h10A3.76 3.76 0 0 0 20 17.75v-5a.751.751 0 1 0-1.5 0v5c0 1.252-.998 2.25-2.25 2.25h-10A2.24 2.24 0 0 1 4 17.75v-10c0-1.252.998-2.25 2.25-2.25h5a.75.75 0 1 0 0-1.5z' />
  </svg>
);
export default SvgIconExternalLink;
