import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconDownloadFromTheCloud = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 17' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill='#333025'
      d='M8 3.834A4.005 4.005 0 0 0 4.014 7.5h-.18A2.837 2.837 0 0 0 1 10.334a2.836 2.836 0 0 0 2.833 2.833h1.712a1.16 1.16 0 0 1-.212-.667c0-.115.022-.226.054-.333H3.833A1.835 1.835 0 0 1 2 10.334C2 9.323 2.822 8.5 3.833 8.5H4.5A.5.5 0 0 0 5 8v-.167c0-1.654 1.346-3 3-3s3 1.346 3 3V8a.5.5 0 0 0 .5.5h.667c1.01 0 1.833.822 1.833 1.834a1.835 1.835 0 0 1-1.833 1.833h-1.554c.032.107.054.218.054.333 0 .242-.076.473-.212.667h1.712A2.836 2.836 0 0 0 15 10.334 2.837 2.837 0 0 0 12.167 7.5h-.181A4.005 4.005 0 0 0 8 3.834m-.008 4.659A.5.5 0 0 0 7.5 9v3.793l-.646-.646a.501.501 0 1 0-.708.707l1.458 1.457a.5.5 0 0 0 .795-.003l1.455-1.454a.501.501 0 1 0-.708-.707l-.646.646V9a.5.5 0 0 0-.508-.507'
    />
  </svg>
);
export default SvgIconDownloadFromTheCloud;
