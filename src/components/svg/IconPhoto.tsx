import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconPhoto = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 19 19' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M11.176 0c.759 0 1.464.42 1.846 1.1l1.043 1.858h1.848C17.609 2.958 19 4.402 19 6.163v9.369c0 1.76-1.39 3.205-3.087 3.205H3.087C1.391 18.737 0 17.293 0 15.532v-9.37c0-1.76 1.391-3.204 3.087-3.204h1.848L5.979 1.1A2.13 2.13 0 0 1 7.825 0zM9.5 6.793c-2.234 0-4.046 1.88-4.046 4.199s1.812 4.199 4.046 4.199 4.044-1.88 4.044-4.199-1.81-4.199-4.044-4.199' />
  </svg>
);
export default SvgIconPhoto;
