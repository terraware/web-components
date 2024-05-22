import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconFutures = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 2a2.515 2.515 0 0 0-2.503 2.503V20.5H7.5v-8.497A2.515 2.515 0 0 0 4.997 9.5a2.514 2.514 0 0 0-2.502 2.503V20.5H1.75a.751.751 0 1 0 0 1.5h15.372q.121.02.243 0h3.247q.136.026.274 0h1.364a.751.751 0 1 0 0-1.5h-.75V7.003A2.515 2.515 0 0 0 18.997 4.5a2.514 2.514 0 0 0-2.502 2.503V20.5H14.5l.003-15.997A2.515 2.515 0 0 0 12 2m0 1.5a.99.99 0 0 1 1.003 1.003L13 20.5h-2.003V4.503A.99.99 0 0 1 12 3.5M18.997 6A.99.99 0 0 1 20 7.003V20.5h-2.005V7.003A.99.99 0 0 1 18.997 6m-14 5A.99.99 0 0 1 6 12.003V20.5H3.995v-8.497A.99.99 0 0 1 4.997 11' />
  </svg>
);
export default SvgIconFutures;
