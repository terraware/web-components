import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgSearch = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M10.25 3C6.255 3 3 6.255 3 10.25s3.255 7.25 7.25 7.25c1.728 0 3.317-.61 4.565-1.625l4.905 4.905a.75.75 0 1 0 1.06-1.06l-4.905-4.905A7.213 7.213 0 0 0 17.5 10.25C17.5 6.255 14.245 3 10.25 3Zm0 1.5A5.739 5.739 0 0 1 16 10.25a5.727 5.727 0 0 1-1.604 3.985.746.746 0 0 0-.16.16A5.727 5.727 0 0 1 10.25 16a5.739 5.739 0 0 1-5.75-5.75 5.739 5.739 0 0 1 5.75-5.75Z' />
  </svg>
);

export default SvgSearch;
