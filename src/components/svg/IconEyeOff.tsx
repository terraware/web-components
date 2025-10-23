import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconEyeOff = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M21.235 1.993a.75.75 0 0 0-.515.227l-18.5 18.5a.75.75 0 1 0 1.06 1.06l5.178-5.178A4.81 4.81 0 0 0 12 18.165a4.84 4.84 0 0 0 4.835-4.83c0-1.4-.605-2.661-1.563-3.547l2.254-2.254c2.426 1.42 4.308 3.714 5 6.4a.747.747 0 0 0 .909.54.74.74 0 0 0 .54-.909c-.77-3-2.744-5.528-5.336-7.143L21.78 3.28a.75.75 0 0 0-.545-1.287M11.995 4.5C6.41 4.5 1.375 8.31.025 13.565a.74.74 0 0 0 .54.91.74.74 0 0 0 .91-.54C2.64 9.41 7.165 6 11.995 6c.855 0 1.7.105 2.515.31l1.23-1.23a12.4 12.4 0 0 0-3.745-.58m.005 4a4.84 4.84 0 0 0-4.82 5.14l1.895-1.895a3.32 3.32 0 0 1 1.34-1.34L12.31 8.51c-.105-.005-.205-.01-.31-.01m2.213 2.348a3.32 3.32 0 0 1 1.122 2.487A3.336 3.336 0 0 1 12 16.665a3.32 3.32 0 0 1-2.482-1.122z' />
  </svg>
);
export default SvgIconEyeOff;
