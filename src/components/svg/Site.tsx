import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSite = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M9.271 4a.75.75 0 0 0-.462.144l-5.5 4A.75.75 0 0 0 3 8.75v10.5a.75.75 0 0 0 1.191.606l5.059-3.678 5.059 3.678a.75.75 0 0 0 .882 0l5.5-4A.75.75 0 0 0 21 15.25V4.75a.75.75 0 0 0-1.191-.606L14.75 7.822 9.691 4.144A.75.75 0 0 0 9.271 4ZM9.25 5.678l5.059 3.678a.75.75 0 0 0 .882 0L19.5 6.223v8.645l-4.75 3.454-5.059-3.678a.75.75 0 0 0-.882 0L4.5 17.776V9.132l4.75-3.454Zm-.507 3.311a.75.75 0 0 0-.523.23l-.47.47-.47-.47a.75.75 0 1 0-1.06 1.061l.47.47-.47.47a.75.75 0 1 0 1.06 1.06l.47-.47.47.47a.751.751 0 0 0 1.23-.817.75.75 0 0 0-.17-.243l-.47-.47.47-.47a.75.75 0 0 0-.537-1.29Zm9.007.511a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-6.5.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm2 1.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm3 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-1.5 2a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z' />
  </svg>
);
export default SvgSite;
