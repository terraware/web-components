import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconSubmit = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12.727 3a.75.75 0 0 0-.727.75V7H5.25C3.74 7 2.5 8.24 2.5 9.75v4.5C2.5 15.76 3.74 17 5.25 17H12v3.25a.75.75 0 0 0 1.273.538l8.5-8.25a.752.752 0 0 0 0-1.076l-8.5-8.25A.751.751 0 0 0 12.727 3Zm.773 2.523L20.173 12 13.5 18.477V16.25a.75.75 0 0 0-.75-.75h-7.5c-.7 0-1.25-.55-1.25-1.25v-4.5c0-.7.55-1.25 1.25-1.25h7.5a.75.75 0 0 0 .75-.75V5.523Zm-.765 3.97a.75.75 0 0 0-.515.227l-2.97 2.97-1.22-1.22a.751.751 0 0 0-1.23.817.75.75 0 0 0 .17.243l1.75 1.75a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-.545-1.287Z' />
  </svg>
);
export default SvgIconSubmit;
