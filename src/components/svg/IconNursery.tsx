import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconNursery = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule='evenodd'
      d='m15.6 3.15 4.35 4.7C20.6 8.55 21 9.6 21 10.7v9.05c0 1-.65 1.75-1.5 1.75H4.4c-.8 0-1.4-.75-1.4-1.75V10.7c0-1.1.35-2.15.9-2.85l3.95-4.7c.35-.4.85-.65 1.35-.65h5v.05c.5 0 1 .2 1.4.6m-6.55 1c.05-.1.15-.15.2-.15h2.8l-3 3.25-.55.6c-.5.55-.85 1.3-.95 2.1H4.6c.1-.45.25-.85.5-1.1l1.3-1.6zm9.85 4.7-4.35-4.7c-.05-.05-.15-.15-.3-.15s-.25.1-.3.15l-4.3 4.7c-.25.3-.45.65-.55 1.1h10.35c-.1-.45-.3-.8-.55-1.1m.6 2.6v5.8H9v-5.8zm-12 5.8v-5.8h-3v5.8zM9.05 20C9 19.95 9 19.85 9 19.75v-1h10.5v1c0 .059-.017.117-.031.166q-.017.052-.019.084zM4.5 18.75v1c0 .1 0 .2.05.25H7.5v-1.25z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgIconNursery;
