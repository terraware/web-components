import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgBlobbyGrayIconUploadToTheCloud = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 200 128' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
    />
    <path d='M100 45.333c-8.373 0-15.264 6.467-15.943 14.667h-.724C77.084 60 72 65.084 72 71.333c0 6.25 5.084 11.334 11.333 11.334h12v-4h-12c-4.044 0-7.333-3.29-7.333-7.334S79.29 64 83.333 64H86c1.105 0 2-.895 2-2v-.667c0-6.616 5.384-12 12-12s12 5.384 12 12V62a2 2 0 0 0 2 2h2.667c4.044 0 7.333 3.29 7.333 7.333 0 4.044-3.289 7.334-7.333 7.334h-12v4h12c6.249 0 11.333-5.084 11.333-11.334S122.916 60 116.667 60h-.724c-.679-8.2-7.57-14.667-15.943-14.667Zm-.031 18.638a2.001 2.001 0 0 0-1.565.797l-5.818 5.818a2 2 0 1 0 2.828 2.828L98 70.828V86a2.002 2.002 0 0 0 2.772 1.873A2.002 2.002 0 0 0 102 86V70.828l2.586 2.586a1.998 1.998 0 0 0 2.857.029 2.01 2.01 0 0 0 .586-1.435 2.006 2.006 0 0 0-.615-1.422l-5.828-5.828a2.003 2.003 0 0 0-1.617-.787Z' />
  </svg>
);

export default SvgBlobbyGrayIconUploadToTheCloud;
