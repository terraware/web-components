import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconLibrary = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill='#333025'
      d='M5.25 2.5a.75.75 0 0 0-.75.75V4H2.75a.75.75 0 0 0-.75.75v15.5a.75.75 0 0 0 .75.75h18.5a.75.75 0 0 0 .75-.75V4.75a.75.75 0 0 0-.75-.75H19.5v-.75a.75.75 0 0 0-.75-.75H15c-1.256 0-2.318.666-3 1.622-.681-.956-1.744-1.622-3-1.622zM6 4h3c1.252 0 2.25.998 2.25 2.25v11.515A3.73 3.73 0 0 0 9 17H6V4.873a.8.8 0 0 0 0-.243zm9 0h3v.627a.8.8 0 0 0 0 .243V17h-3c-.845 0-1.621.29-2.25.765V6.25C12.75 4.998 13.748 4 15 4M3.5 5.5h1v12.25a.75.75 0 0 0 .75.75H9a2.24 2.24 0 0 1 1.87 1H3.5zm16 0h1v14h-7.37a2.24 2.24 0 0 1 1.87-1h3.75a.75.75 0 0 0 .75-.75z'
    />
  </svg>
);
export default SvgIconLibrary;
