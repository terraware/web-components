import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgNotification = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M11.639 2.009C7.597 2.199 4.5 5.672 4.5 9.69v3.634L3.175 15.99a.966.966 0 0 0-.007.015c-.533 1.134.33 2.495 1.583 2.495H9c0 1.648 1.352 3 3 3s3-1.352 3-3h4.248c1.253 0 2.117-1.361 1.584-2.495a.963.963 0 0 0-.007-.015L19.5 13.324V9.5c0-4.253-3.568-7.693-7.861-7.491Zm.07 1.498A5.987 5.987 0 0 1 18 9.5v4c0 .116.027.23.078.334l1.397 2.81c.09.193-.015.356-.227.356H4.751c-.212 0-.316-.163-.226-.355v-.002l1.397-2.809A.75.75 0 0 0 6 13.5V9.69c0-3.25 2.49-6.032 5.709-6.183ZM10.5 18.5h3c0 .837-.663 1.5-1.5 1.5s-1.5-.663-1.5-1.5Z' />
  </svg>
);
export default SvgNotification;
