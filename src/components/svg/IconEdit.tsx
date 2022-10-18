import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgIconEdit = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M16 .505c-.898 0-1.795.34-2.475 1.02L2.458 12.592a1.75 1.75 0 0 0-.445.758L.529 18.544a.75.75 0 0 0 .927.927l5.195-1.484h.001c.285-.082.545-.234.756-.445L18.474 6.475a3.51 3.51 0 0 0 0-4.95A3.488 3.488 0 0 0 16 .505Zm0 1.491c.51 0 1.02.197 1.413.59.788.787.788 2.04 0 2.828l-.969.97-2.828-2.828.97-.97c.393-.393.903-.59 1.414-.59Zm-3.444 2.62 2.828 2.828-9.037 9.037a.252.252 0 0 1-.109.064l-3.896 1.113 1.113-3.897v-.001a.246.246 0 0 1 .063-.108l9.038-9.036Z' />
  </svg>
);

export default SvgIconEdit;
