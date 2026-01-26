import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconVideo = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke='#fff'
      strokeMiterlimit={10}
      strokeWidth={0.797}
      d='M9.167 12.5H3.5c-.92 0-1.667-.746-1.667-1.667V5.167c0-.92.747-1.667 1.667-1.667h5.667c.92 0 1.666.746 1.666 1.667v5.666c0 .92-.746 1.667-1.666 1.667Z'
    />
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit={10}
      strokeWidth={0.797}
      d='m10.833 9.5 3.334 2v-7l-3.334 2'
    />
  </svg>
);
export default SvgIconVideo;
