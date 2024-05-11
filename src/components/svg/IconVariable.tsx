import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconVariable = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill='#333025'
      d='M11.979 1a.75.75 0 0 0-.32.082L2.91 5.538a.75.75 0 0 0-.409.668v10.395a.75.75 0 0 0 .343.63l8.75 5.649a.75.75 0 0 0 .814 0l8.75-5.649a.75.75 0 0 0 .343-.63V6.206a.75.75 0 0 0-.41-.668l-8.75-4.456A.75.75 0 0 0 11.98 1ZM12 2.592l7.208 3.67-2.518 1.524-4.35-2.215a.75.75 0 0 0-.68 0L7.31 7.786 4.793 6.263 12 2.592Zm0 4.489 3.179 1.62L12 10.622 8.821 8.7 12 7.081Zm-8 .456L6.5 9.05v5.373a.75.75 0 0 0 .343.63l4.407 2.844v2.976L4 16.193V7.536Zm16 0v8.655l-7.25 4.681v-2.976l4.407-2.844a.75.75 0 0 0 .343-.63V9.05L20 7.537ZM8 9.957l3.25 1.966v4.19L8 14.012V9.958Zm8 0v4.057l-3.25 2.098v-4.19L16 9.958Z'
    />
  </svg>
);
export default SvgIconVariable;
