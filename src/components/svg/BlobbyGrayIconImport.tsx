import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyGrayIconImport = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-gray-icon-import_svg__a)'>
      <path
        fill='#F1F0EC'
        fillRule='evenodd'
        d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734'
        clipRule='evenodd'
      />
      <path
        fill='#7F775B'
        d='M84.667 37.333c-3.29 0-6 2.71-6 6v41.334c0 3.29 2.71 6 6 6h30.666c3.29 0 6-2.71 6-6v-28c0-.53-.21-1.04-.586-1.414l-.02-.021-17.313-17.313a2 2 0 0 0-1.414-.586zm0 4H100v11.334c0 3.29 2.71 6 6 6h11.333v26c0 1.128-.871 2-2 2H84.667c-1.129 0-2-.872-2-2V43.333c0-1.128.871-2 2-2M104 44.161l10.505 10.506H106c-1.129 0-2-.872-2-2zM99.971 60a2 2 0 0 0-1.385.586l-5.333 5.333a2 2 0 1 0 2.828 2.828L98 66.828V74A2 2 0 1 0 102 74v-7.172l1.919 1.92a2.002 2.002 0 0 0 3.295-.63 1.99 1.99 0 0 0-.016-1.55 2 2 0 0 0-.451-.649l-5.333-5.333A2 2 0 0 0 99.971 60m-8.638 18.667a2.002 2.002 0 0 0-1.873 2.772 2 2 0 0 0 1.873 1.228h17.334a2 2 0 1 0 0-4z'
      />
    </g>
    <defs>
      <clipPath id='blobby-gray-icon-import_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyGrayIconImport;
