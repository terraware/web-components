import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconNote = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill='#333025'
      d='M5.25 3A2.26 2.26 0 0 0 3 5.25v13.5A2.26 2.26 0 0 0 5.25 21h9.5a.75.75 0 0 0 .538-.227l5.492-5.493a.75.75 0 0 0 .22-.53v-9.5A2.26 2.26 0 0 0 18.75 3zm0 1.5h13.5c.423 0 .75.327.75.75V14h-3.25A2.26 2.26 0 0 0 14 16.25v3.25H5.25a.74.74 0 0 1-.75-.75V5.25c0-.423.327-.75.75-.75m2.5 2.499a.75.75 0 1 0 0 1.5h8.5a.75.75 0 1 0 0-1.5zm0 3.5a.751.751 0 1 0 0 1.5h6.5a.75.75 0 1 0 0-1.5zm8.5 5.001h2.19l-2.94 2.94v-2.19c0-.423.327-.75.75-.75'
    />
  </svg>
);
export default SvgIconNote;
