import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconFullScreen = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill='#333025'
      d='M5.75 3C4.24 3 3 4.24 3 5.75v3a.75.75 0 1 0 1.5 0v-3c0-.699.55-1.25 1.25-1.25h3a.75.75 0 1 0 0-1.5h-3Zm9.5 0a.75.75 0 1 0 0 1.5h3c.7 0 1.25.551 1.25 1.25v3a.75.75 0 1 0 1.5 0v-3C21 4.24 19.76 3 18.25 3h-3ZM3.738 14.49a.75.75 0 0 0-.738.76v3C3 19.76 4.24 21 5.75 21h3a.751.751 0 1 0 0-1.5h-3c-.7 0-1.25-.55-1.25-1.25v-3a.75.75 0 0 0-.762-.76Zm16.5 0a.75.75 0 0 0-.738.76v3c0 .7-.55 1.25-1.25 1.25h-3a.75.75 0 1 0 0 1.5h3c1.51 0 2.75-1.24 2.75-2.75v-3a.75.75 0 0 0-.762-.76Z'
    />
  </svg>
);
export default SvgIconFullScreen;
