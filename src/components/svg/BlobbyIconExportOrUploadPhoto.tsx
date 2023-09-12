import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconExportOrUploadPhoto = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-export-or-upload-photo_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-export-or-upload-photo_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-export-or-upload-photo_svg__c)'
        d='M144.999 66.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-export-or-upload-photo_svg__d)'
        d='M70.999 23.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-export-or-upload-photo_svg__e)'
        d='M64.999 103.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <mask
        id='blobby-icon-export-or-upload-photo_svg__g'
        width={200}
        height={128}
        x={0}
        y={0}
        maskUnits='userSpaceOnUse'
        style={{
          maskType: 'alpha',
        }}
      >
        <path
          fill='#E2F6EC'
          fillRule='evenodd'
          d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
          clipRule='evenodd'
        />
        <path
          fill='url(#blobby-icon-export-or-upload-photo_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-export-or-upload-photo_svg__g)'>
        <path
          fill='url(#blobby-icon-export-or-upload-photo_svg__h)'
          d='m162.5 97.5-41-41h-4.18L104.82 44l-5.32-2-8.939 9.435 14 14L77.5 85l45.069 45.069L162.5 97.5Z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M76 62c0-4.026 3.307-7.333 7.333-7.333H86s27.735-.004 28 0h2.667c4.026 0 7.333 3.307 7.333 7.333v18.667c0 4.026-3.307 7.333-7.333 7.333H83.333C79.307 88 76 84.693 76 80.667V62Z'
      />
      <path
        fill='#2C8658'
        d='M99.971 40a2 2 0 0 0-1.385.586l-8 8a2 2 0 1 0 2.828 2.828L98 46.828v28.505a2.002 2.002 0 0 0 2.772 1.874A2.004 2.004 0 0 0 102 75.333V46.828l4.586 4.586a1.998 1.998 0 0 0 3.295-.63 2.005 2.005 0 0 0-.467-2.198l-8-8A1.996 1.996 0 0 0 99.971 40ZM83.333 54.667C79.307 54.667 76 57.974 76 62v18.667C76 84.693 79.307 88 83.333 88h33.334c4.026 0 7.333-3.307 7.333-7.333V62c0-4.026-3.307-7.333-7.333-7.333H114a2 2 0 1 0 0 4h2.667A3.304 3.304 0 0 1 120 62v18.667A3.304 3.304 0 0 1 116.667 84H83.333A3.304 3.304 0 0 1 80 80.667V62a3.304 3.304 0 0 1 3.333-3.333H86a2 2 0 1 0 0-4h-2.667Z'
      />
    </g>
    <defs>
      <linearGradient id='blobby-icon-export-or-upload-photo_svg__b' x1={133} x2={49.23} y1={114} y2={31.784} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-export-or-upload-photo_svg__c' x1={135} x2={145} y1={59} y2={74} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-export-or-upload-photo_svg__d' x1={61} x2={71} y1={16} y2={31} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-export-or-upload-photo_svg__e' x1={55} x2={65} y1={96} y2={111} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-export-or-upload-photo_svg__f' x1={133} x2={49.23} y1={114} y2={31.784} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-export-or-upload-photo_svg__h' x1={83.5} x2={141.873} y1={59.042} y2={108.918} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-export-or-upload-photo_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconExportOrUploadPhoto;
