import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconCancel = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2m0 1.5c4.703 0 8.5 3.797 8.5 8.5s-3.797 8.5-8.5 8.5A8.49 8.49 0 0 1 3.5 12c0-4.703 3.797-8.5 8.5-8.5m3.243 4.49a.75.75 0 0 0-.523.23L12 10.94 9.28 8.22a.75.75 0 1 0-1.06 1.06L10.94 12l-2.72 2.72a.75.75 0 1 0 1.06 1.06L12 13.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L13.06 12l2.72-2.72a.75.75 0 0 0-.537-1.29' />
  </svg>
);
export default SvgIconCancel;
