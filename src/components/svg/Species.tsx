import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSpecies = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M22 17.74a.75.75 0 0 0-.22-.52l-2.5-2.5a.75.75 0 1 0-1.06 1.06L19.44 17h-6.69c-.7 0-1.25-.55-1.25-1.25v-7a.751.751 0 1 0-1.5 0v7c0 1.51 1.24 2.75 2.75 2.75h6.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 .22-.54m-.5-11.5a.75.75 0 0 0-.22-.52l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H3.25a.75.75 0 1 0 0 1.5h15.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 .22-.54' />
  </svg>
);
export default SvgSpecies;
