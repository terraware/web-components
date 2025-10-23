import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSpinner = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' xmlSpace='preserve' viewBox='0 0 48 48' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <circle cx={24} cy={24} r={20} fill='none' />
    <path d='M24 12c-.8 0-1.5-.7-1.5-1.5v-5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v5c0 .8-.7 1.5-1.5 1.5' />
    <path d='M24 44c-.8 0-1.5-.7-1.5-1.5v-5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v5c0 .8-.7 1.5-1.5 1.5' opacity={0.1} />
    <path d='M10.5 25.5h-5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5' opacity={0.55} />
    <path
      d='M17.3 13.8c-.5 0-1-.3-1.3-.8l-2.5-4.3c-.5-.7-.2-1.6.5-2s1.6-.2 2 .5l2.5 4.3c.4.7.2 1.6-.5 2-.2.2-.5.3-.7.3'
      opacity={0.85}
    />
    <path
      d='M33.3 41.5c-.5 0-1-.3-1.3-.8l-2.5-4.3c-.4-.7-.2-1.6.5-2s1.6-.2 2 .5l2.5 4.3c.4.7.2 1.6-.5 2-.2.3-.5.3-.7.3'
      opacity={0.05}
    />
    <path
      d='M8 34.8c-.5 0-1-.3-1.3-.8-.4-.7-.2-1.6.5-2l4.3-2.5c.7-.4 1.6-.2 2 .5s.2 1.6-.5 2l-4.3 2.5c-.2.2-.5.3-.7.3'
      opacity={0.4}
    />
    <path
      d='M12.3 18.8c-.3 0-.5-.1-.7-.2L7.2 16c-.7-.4-1-1.3-.5-2s1.3-1 2-.5L13 16c.7.4 1 1.3.5 2-.2.5-.7.8-1.2.8'
      opacity={0.7}
    />
    <path
      d='M14.7 41.5c-.3 0-.5-.1-.7-.2-.7-.4-1-1.3-.5-2L16 35c.4-.7 1.3-1 2-.5.7.4 1 1.3.5 2L16 40.8c-.2.5-.7.7-1.3.7'
      opacity={0.25}
    />
  </svg>
);
export default SvgSpinner;
