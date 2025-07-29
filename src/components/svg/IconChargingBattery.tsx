import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconChargingBattery = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M4.75 6C3.24 6 2 7.24 2 8.75v6.5C2 16.76 3.24 18 4.75 18h12.5c1.51 0 2.75-1.24 2.75-2.75V14h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1V8.75C20 7.24 18.76 6 17.25 6zm0 1.5h12.5c.7 0 1.25.55 1.25 1.25v6.5c0 .7-.55 1.25-1.25 1.25H4.75c-.7 0-1.25-.55-1.25-1.25v-6.5c0-.7.55-1.25 1.25-1.25m5.652 1.503a.356.356 0 0 0-.402.354V12l-3.055-.99a.357.357 0 0 0-.316.622l4.785 3.285a.357.357 0 0 0 .586-.274V12l3.055.99a.357.357 0 0 0 .316-.622l-4.785-3.285a.36.36 0 0 0-.184-.08' />
  </svg>
);
export default SvgIconChargingBattery;
