import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgIconMenuVertical = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 16.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0-6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0-6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z' fill='#3A4445' />
  </svg>
);

export default SvgIconMenuVertical;
