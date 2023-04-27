import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconTrashCan = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 2c-1.648 0-3 1.352-3 3H5.873a.75.75 0 0 0-.243 0H3.75a.75.75 0 1 0 0 1.5H5v12.75C5 20.76 6.24 22 7.75 22h8.5c1.51 0 2.75-1.24 2.75-2.75V6.5h1.25a.75.75 0 1 0 0-1.5h-1.877a.75.75 0 0 0-.243 0H15c0-1.648-1.352-3-3-3Zm0 1.5c.837 0 1.5.663 1.5 1.5h-3c0-.837.663-1.5 1.5-1.5Zm-5.5 3h11v12.75c0 .7-.55 1.25-1.25 1.25h-8.5c-.7 0-1.25-.55-1.25-1.25V6.5Zm3.738 2.49a.75.75 0 0 0-.738.76v7.5a.75.75 0 1 0 1.5 0v-7.5a.75.75 0 0 0-.762-.76Zm3.5 0a.75.75 0 0 0-.738.76v7.5a.751.751 0 1 0 1.5 0v-7.5a.75.75 0 0 0-.762-.76Z' />
  </svg>
);
export default SvgIconTrashCan;
