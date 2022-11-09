import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgIconEdit = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d='M18 2.505c-.897 0-1.795.34-2.475 1.02L4.458 14.592a1.75 1.75 0 0 0-.445.758l-1.484 5.194a.75.75 0 0 0 .927.927l5.195-1.484h.001c.285-.082.546-.234.756-.445L20.475 8.475a3.51 3.51 0 0 0 0-4.95A3.488 3.488 0 0 0 18 2.505Zm0 1.491c.51 0 1.02.197 1.413.59h.001c.787.787.787 2.04 0 2.828l-.97.97-2.828-2.828.97-.97c.393-.393.904-.59 1.414-.59Zm-3.444 2.62 2.828 2.828-9.037 9.037a.252.252 0 0 1-.109.064l-3.896 1.113 1.113-3.897v-.001a.245.245 0 0 1 .064-.108l9.037-9.036Z'
      fill='#3A4445'
    />
  </svg>
);

export default SvgIconEdit;
