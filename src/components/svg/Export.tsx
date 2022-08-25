import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgExport = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d='M11.99 3a.75.75 0 0 0-.52.22l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v10.69a.751.751 0 1 0 1.5 0V5.56l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3a.75.75 0 0 0-.54-.22ZM5.75 8.5C4.24 8.5 3 9.74 3 11.25v7C3 19.76 4.24 21 5.75 21h12.5c1.51 0 2.75-1.24 2.75-2.75v-7c0-1.51-1.24-2.75-2.75-2.75h-1a.75.75 0 1 0 0 1.5h1c.7 0 1.25.55 1.25 1.25v7c0 .7-.55 1.25-1.25 1.25H5.75c-.7 0-1.25-.55-1.25-1.25v-7c0-.7.55-1.25 1.25-1.25h1a.75.75 0 1 0 0-1.5h-1Z'
      fill='#3A4445'
    />
  </svg>
);

export default SvgExport;
