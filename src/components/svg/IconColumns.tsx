import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgIconColumns = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M4.25 3.5A2.261 2.261 0 0 0 2 5.75v12.5a2.261 2.261 0 0 0 2.25 2.25h15.5A2.261 2.261 0 0 0 22 18.25V5.75a2.261 2.261 0 0 0-2.25-2.25H4.25Zm0 1.5H8v14H4.25a.739.739 0 0 1-.75-.75V5.75c0-.423.327-.75.75-.75ZM9.5 5h5v14h-5V5ZM16 5h3.75c.423 0 .75.327.75.75v12.5c0 .423-.327.75-.75.75H16V5Z' />
  </svg>
);

export default SvgIconColumns;
