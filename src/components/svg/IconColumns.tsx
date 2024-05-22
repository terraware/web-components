import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconColumns = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M4.25 3.5A2.26 2.26 0 0 0 2 5.75v12.5a2.26 2.26 0 0 0 2.25 2.25h15.5A2.26 2.26 0 0 0 22 18.25V5.75a2.26 2.26 0 0 0-2.25-2.25zm0 1.5H8v14H4.25a.74.74 0 0 1-.75-.75V5.75c0-.423.327-.75.75-.75M9.5 5h5v14h-5zM16 5h3.75c.423 0 .75.327.75.75v12.5c0 .423-.327.75-.75.75H16z' />
  </svg>
);
export default SvgIconColumns;
