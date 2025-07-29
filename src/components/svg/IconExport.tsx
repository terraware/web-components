import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconExport = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M6.25 2A2.26 2.26 0 0 0 4 4.25v15.5A2.26 2.26 0 0 0 6.25 22h11.5A2.26 2.26 0 0 0 20 19.75V9.25a.75.75 0 0 0-.22-.53l-.008-.008L13.28 2.22a.75.75 0 0 0-.53-.22zm0 1.5H12v4.25A2.26 2.26 0 0 0 14.25 10h4.25v9.75c0 .423-.327.75-.75.75H6.25a.74.74 0 0 1-.75-.75V4.25c0-.423.327-.75.75-.75m7.25 1.06 3.94 3.94h-3.19a.74.74 0 0 1-.75-.75zm-1.512 6.43a.75.75 0 0 0-.738.76v3.19l-.72-.72a.75.75 0 1 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l2-2a.75.75 0 1 0-1.06-1.06l-.72.72v-3.19a.75.75 0 0 0-.762-.76m.023 6.51H8.75a.751.751 0 1 0 0 1.5h6.5a.751.751 0 1 0 0-1.5z' />
  </svg>
);
export default SvgIconExport;
