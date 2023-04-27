import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconWifi = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M11.905 3.553A15.317 15.317 0 0 0 1.04 8.049a.75.75 0 1 0 1.06 1.06c5.422-5.421 14.19-5.421 19.61 0a.751.751 0 1 0 1.061-1.06 15.32 15.32 0 0 0-10.866-4.496Zm0 4.46a10.872 10.872 0 0 0-7.712 3.19.75.75 0 1 0 1.06 1.06 9.396 9.396 0 0 1 13.305 0 .75.75 0 1 0 1.06-1.06 10.874 10.874 0 0 0-7.713-3.19Zm0 4.459a6.428 6.428 0 0 0-4.56 1.883.75.75 0 1 0 1.062 1.061 4.937 4.937 0 0 1 6.997 0 .748.748 0 0 0 1.236-.236.75.75 0 0 0-.175-.825 6.428 6.428 0 0 0-4.56-1.883ZM12 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z' />
  </svg>
);
export default SvgIconWifi;
