import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconLayers = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M7.197 3c-1.204 0-2.274.79-2.628 1.941L3.601 8.09C3.162 9.516 4.258 11 5.75 11h11.052c1.203 0 2.274-.79 2.628-1.941v-.001l.967-3.146C20.838 4.483 19.741 3 18.248 3H7.198Zm0 1.5h11.051c.525 0 .871.469.717.97l-.969 3.148a1.242 1.242 0 0 1-1.193.882H5.75a.733.733 0 0 1-.717-.97l.969-3.147A1.244 1.244 0 0 1 7.197 4.5ZM20.35 9.447a3.729 3.729 0 0 1-1.704 2.065l-.649 2.105a1.243 1.243 0 0 1-1.194.883H5.75a.744.744 0 0 1-.603-.305.741.741 0 0 1-.114-.666l.475-1.544a3.21 3.21 0 0 1-1.43-.45L3.6 13.087a2.23 2.23 0 0 0 .34 1.998 2.227 2.227 0 0 0 1.81.914h11.052c1.215 0 2.271-.78 2.629-1.941l.968-3.147a2.23 2.23 0 0 0-.05-1.465Zm0 5a3.729 3.729 0 0 1-1.704 2.065l-.649 2.105a1.243 1.243 0 0 1-1.194.883H5.75a.744.744 0 0 1-.603-.305.741.741 0 0 1-.114-.666l.475-1.544a3.21 3.21 0 0 1-1.43-.45L3.6 18.087a2.23 2.23 0 0 0 .34 1.998 2.227 2.227 0 0 0 1.81.914h11.052c1.215 0 2.271-.78 2.629-1.941l.968-3.147a2.23 2.23 0 0 0-.05-1.465Z' />
  </svg>
);
export default SvgIconLayers;