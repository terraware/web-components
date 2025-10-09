import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconExpand = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 17' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill='#333025'
      d='M2.495 2.495A.5.5 0 0 0 2 3.064V6a.5.5 0 1 0 1 0V4.207l3.146 3.146a.5.5 0 1 0 .707-.707L3.707 3.5H5.5a.5.5 0 1 0 0-1H2.563a1 1 0 0 0-.068-.005m10.995 0-.054.005H10.5a.5.5 0 1 0 0 1h1.793L9.146 6.646a.5.5 0 1 0 .707.707L13 4.207V6a.5.5 0 1 0 1 0V3.063a.5.5 0 0 0-.51-.568m-3.995 7a.5.5 0 0 0-.349.858l3.147 3.147H10.5a.5.5 0 1 0 0 1h2.937a.5.5 0 0 0 .563-.564V11a.501.501 0 1 0-1 0v1.793L9.853 9.646a.5.5 0 0 0-.358-.151m-3.005 0a.5.5 0 0 0-.344.151L3 12.793V11a.5.5 0 1 0-1 0v2.937a.5.5 0 0 0 .564.563H5.5a.499.499 0 1 0 0-1H3.707l3.146-3.147a.5.5 0 0 0-.363-.858'
    />
  </svg>
);
export default SvgIconExpand;
