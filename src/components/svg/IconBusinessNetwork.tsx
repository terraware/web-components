import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconBusinessNetwork = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill='#333025'
      d='M12 1a1.75 1.75 0 0 0-1.742 1.888L4.744 6.062a1.75 1.75 0 0 0-2.087.071A1.75 1.75 0 0 0 3 9.081v5.84a1.75 1.75 0 0 0 .75 3.329c.356 0 .703-.109.995-.311l5.51 3.172A1.752 1.752 0 0 0 12 23a1.75 1.75 0 0 0 1.742-1.888l5.514-3.173a1.75 1.75 0 0 0 2.087-.073A1.75 1.75 0 0 0 21 14.92v-5.84a1.75 1.75 0 0 0-.75-3.329 1.75 1.75 0 0 0-.995.312l-5.51-3.173A1.752 1.752 0 0 0 12 1Zm-.994 3.188a1.75 1.75 0 0 0 1.99.001l5.51 3.172a1.75 1.75 0 0 0 .994 1.72v5.84a1.75 1.75 0 0 0-.992 1.717l-5.514 3.174A1.75 1.75 0 0 0 12 19.5a1.75 1.75 0 0 0-.996.311l-5.51-3.172a1.75 1.75 0 0 0-.994-1.72v-5.84a1.75 1.75 0 0 0 .992-1.717l5.514-3.175ZM12 6.5c-.77 0-1.444.316-1.873.799A2.547 2.547 0 0 0 9.5 9c0 .604.198 1.218.627 1.701.429.483 1.102.799 1.873.799.77 0 1.444-.316 1.873-.799.43-.483.627-1.097.627-1.701 0-.604-.198-1.218-.627-1.701-.43-.483-1.102-.799-1.873-.799ZM12 8c.396 0 .598.121.752.295.154.173.248.434.248.705 0 .27-.094.532-.248.705-.154.174-.356.295-.752.295s-.598-.121-.752-.295A1.08 1.08 0 0 1 11 9c0-.27.094-.532.248-.705C11.402 8.12 11.604 8 12 8Zm-2.25 4.5c-.958 0-1.75.793-1.75 1.75V15c0 .86.618 1.505 1.347 1.898.728.392 1.646.602 2.653.602 1.007 0 1.925-.21 2.653-.602C15.382 16.505 16 15.86 16 15v-.75c0-.957-.793-1.75-1.75-1.75h-4.5Zm0 1.5h4.5c.148 0 .25.102.25.25V15c0 .107-.11.336-.558.577-.448.241-1.154.423-1.942.423s-1.495-.182-1.942-.423c-.448-.241-.558-.47-.558-.577v-.75c0-.148.102-.25.25-.25Z'
    />
  </svg>
);
export default SvgIconBusinessNetwork;