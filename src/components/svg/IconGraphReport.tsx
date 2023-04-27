import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconGraphReport = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M6.25 2C5.01 2 4 3.01 4 4.25v15.5C4 20.99 5.01 22 6.25 22h11.5c1.24 0 2.25-1.01 2.25-2.25V9.25a.747.747 0 0 0-.22-.53l-6.5-6.5a.747.747 0 0 0-.53-.22h-6.5Zm0 1.5H12v4.25C12 8.99 13.01 10 14.25 10h4.25v9.75a.75.75 0 0 1-.75.75H6.25a.749.749 0 0 1-.75-.75V4.25c0-.415.335-.75.75-.75Zm7.25 1.06 3.94 3.94h-3.19a.749.749 0 0 1-.75-.75V4.56ZM16 12.5a1 1 0 0 0-.997.937L13 15.44l-1.503-1.503a1 1 0 0 0-1.68-.666 1 1 0 0 0-.314.665l-1.566 1.567A1 1 0 0 0 8 17.5a1 1 0 0 0 .997-.936L10.5 15.06l1.503 1.504a1 1 0 0 0 1.68.665 1 1 0 0 0 .314-.665l2.067-2.067A1 1 0 0 0 16 12.5Z' />
  </svg>
);
export default SvgIconGraphReport;
