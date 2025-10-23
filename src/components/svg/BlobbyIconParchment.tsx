import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconParchment = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-parchment_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M96.086 15.373c25.873-1.513 57.892.593 65.604 25.277 7.588 24.287-19.377 41.46-40.139 56.23-19.895 14.155-43.87 31.774-63.872 17.768-20.522-14.371-16.173-44.163-7.146-67.498 7.376-19.065 25.103-30.582 45.553-31.777'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-parchment_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M96.086 15.373c25.873-1.513 57.892.593 65.604 25.277 7.588 24.287-19.377 41.46-40.139 56.23-19.895 14.155-43.87 31.774-63.872 17.768-20.522-14.371-16.173-44.163-7.146-67.498 7.376-19.065 25.103-30.582 45.553-31.777'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-parchment_svg__c)'
        d='M144.999 66.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-parchment_svg__d)'
        d='M70.999 23.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-parchment_svg__e)'
        d='M64.999 103.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <mask
        id='blobby-icon-parchment_svg__g'
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
          d='M96.086 15.373c25.873-1.513 57.892.593 65.604 25.277 7.588 24.287-19.377 41.46-40.139 56.23-19.895 14.155-43.87 31.774-63.872 17.768-20.522-14.371-16.173-44.163-7.146-67.498 7.376-19.065 25.103-30.582 45.553-31.777'
          clipRule='evenodd'
        />
        <path
          fill='url(#blobby-icon-parchment_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M96.086 15.373c25.873-1.513 57.892.593 65.604 25.277 7.588 24.287-19.377 41.46-40.139 56.23-19.895 14.155-43.87 31.774-63.872 17.768-20.522-14.371-16.173-44.163-7.146-67.498 7.376-19.065 25.103-30.582 45.553-31.777'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-parchment_svg__g)'>
        <path
          fill='url(#blobby-icon-parchment_svg__h)'
          d='M157.851 72.897 125.974 41.02 73.907 86.058l32.419 32.419z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M88.667 38.667c-4.763 0-8.667 3.904-8.667 8.666v5.006a2 2 0 0 0 0 .648v21.68h-3.333c-2.554 0-4.667 2.113-4.667 4.666v1.334c0 4.762 3.904 8.666 8.667 8.666H110v-.12c3.993-.023 7.333-3.197 7.333-7.213V68.995a2 2 0 0 0 0-.649v-8.685a2 2 0 0 0 0-.648v-4.346h6c2.554 0 4.667-2.114 4.667-4.667v-3.77c0-3.76-2.758-7.162-6.62-7.53a7 7 0 0 0-.713-.03v-.003h-32'
      />
      <path
        fill='#2C8658'
        d='M88.667 38.667c-4.763 0-8.667 3.904-8.667 8.666v5.006a2 2 0 0 0 0 .648v21.68h-3.333c-2.554 0-4.667 2.113-4.667 4.666v1.334c0 4.762 3.904 8.666 8.667 8.666H110v-.12c3.993-.023 7.333-3.197 7.333-7.213V68.995a2 2 0 0 0 0-.649v-8.685a2 2 0 0 0 0-.648v-4.346h6c2.554 0 4.667-2.114 4.667-4.667v-3.77c0-3.76-2.758-7.162-6.62-7.53a7 7 0 0 0-.713-.03v-.003h-32m0 4h25.492a7.2 7.2 0 0 0-.826 3.333v11.333h-4.666a2 2 0 1 0 0 4h4.666v5.334H106a2 2 0 1 0 0 4h7.333V82c0 1.975-1.622 3.513-3.666 3.318-1.686-.16-3-1.736-3-3.547v-2.438c0-2.553-2.114-4.666-4.667-4.666H84v-20h4.667a2 2 0 1 0 0-4H84v-3.334c0-2.6 2.067-4.666 4.667-4.666m32.333.015c1.685.16 3 1.736 3 3.547V50c0 .393-.273.667-.667.667h-6V46c0-1.975 1.622-3.513 3.667-3.318M76.667 78.667H102c.393 0 .667.273.667.666v2.438c0 1.284.417 2.468.994 3.562H80.667A4.64 4.64 0 0 1 76 80.667v-1.334c0-.393.273-.666.667-.666'
      />
    </g>
    <defs>
      <linearGradient
        id='blobby-icon-parchment_svg__b'
        x1={134}
        x2={81.938}
        y1={98.5}
        y2={16.32}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-parchment_svg__c'
        x1={135}
        x2={145}
        y1={59}
        y2={74}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-parchment_svg__d' x1={61} x2={71} y1={16} y2={31} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-parchment_svg__e' x1={55} x2={65} y1={96} y2={111} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-parchment_svg__f'
        x1={134}
        x2={81.938}
        y1={98.5}
        y2={16.32}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-parchment_svg__h'
        x1={96.816}
        x2={127.72}
        y1={63.953}
        y2={97.282}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-parchment_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconParchment;
