import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconFolder = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-folder_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M96.086 15.373c25.873-1.513 57.892.593 65.604 25.277 7.588 24.287-19.377 41.46-40.139 56.23-19.895 14.155-43.87 31.774-63.872 17.768-20.522-14.371-16.173-44.163-7.146-67.498 7.376-19.065 25.103-30.582 45.553-31.777'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-folder_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M96.086 15.373c25.873-1.513 57.892.593 65.604 25.277 7.588 24.287-19.377 41.46-40.139 56.23-19.895 14.155-43.87 31.774-63.872 17.768-20.522-14.371-16.173-44.163-7.146-67.498 7.376-19.065 25.103-30.582 45.553-31.777'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-folder_svg__c)'
        d='M144.999 66.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-folder_svg__d)'
        d='M70.999 23.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-folder_svg__e)'
        d='M64.999 103.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <mask
        id='blobby-icon-folder_svg__g'
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
          fill='url(#blobby-icon-folder_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M96.086 15.373c25.873-1.513 57.892.593 65.604 25.277 7.588 24.287-19.377 41.46-40.139 56.23-19.895 14.155-43.87 31.774-63.872 17.768-20.522-14.371-16.173-44.163-7.146-67.498 7.376-19.065 25.103-30.582 45.553-31.777'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-folder_svg__g)'>
        <path
          fill='url(#blobby-icon-folder_svg__h)'
          d='M152.602 78.825 124.927 51.15 75.319 83.783 103.537 112z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M79.333 42.667c-3.29 0-6 2.71-6 6v30.666c0 3.29 2.71 6 6 6h41.334c3.29 0 6-2.71 6-6v-24c0-3.29-2.71-6-6-6h-20.61l-5.96-4.966a7.33 7.33 0 0 0-4.693-1.7z'
      />
      <path
        fill='#2C8658'
        d='M79.333 42.667c-3.29 0-6 2.71-6 6v30.666c0 3.29 2.71 6 6 6h41.334c3.29 0 6-2.71 6-6v-24c0-3.29-2.71-6-6-6h-20.61l-5.96-4.966a7.33 7.33 0 0 0-4.693-1.7zm0 4h10.07c.781 0 1.534.273 2.133.773l4.672 3.893-4.672 3.894c-.6.5-1.352.773-2.132.773h-12.07v-7.333c0-1.129.87-2 2-2m20.724 6.666h20.61c1.128 0 2 .872 2 2v24c0 1.129-.872 2-2 2H79.333c-1.128 0-2-.871-2-2V60h12.07a7.33 7.33 0 0 0 4.693-1.7z'
      />
    </g>
    <defs>
      <linearGradient
        id='blobby-icon-folder_svg__b'
        x1={134}
        x2={81.938}
        y1={98.5}
        y2={16.32}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-folder_svg__c' x1={135} x2={145} y1={59} y2={74} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-folder_svg__d' x1={61} x2={71} y1={16} y2={31} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-folder_svg__e' x1={55} x2={65} y1={96} y2={111} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-folder_svg__f'
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
        id='blobby-icon-folder_svg__h'
        x1={98.5}
        x2={120.915}
        y1={67.991}
        y2={101.421}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-folder_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconFolder;
