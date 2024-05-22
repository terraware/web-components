import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconLibrary = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-library_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.068-50.066 6.08-21.874 15.757-46.304 38.382-48.19'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-library_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.068-50.066 6.08-21.874 15.757-46.304 38.382-48.19'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-library_svg__c)'
        d='M144.999 66.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-library_svg__d)'
        d='M70.999 23.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-library_svg__e)'
        d='M64.999 103.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <mask
        id='blobby-icon-library_svg__g'
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
          d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.068-50.066 6.08-21.874 15.757-46.304 38.382-48.19'
          clipRule='evenodd'
        />
        <path
          fill='url(#blobby-icon-library_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.068-50.066 6.08-21.874 15.757-46.304 38.382-48.19'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-library_svg__g)'>
        <path
          fill='url(#blobby-icon-library_svg__h)'
          d='m164.713 81.886-38.652-38.652-52.09 44.232 42.362 42.36z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M82 38.667a2 2 0 0 0-2 2v2h-4.667a2 2 0 0 0-2 2V86a2 2 0 0 0 2 2h49.334a2 2 0 0 0 2-2V44.667a2 2 0 0 0-2-2H120v-2a2 2 0 0 0-2-2h-10c-3.35 0-6.183 1.777-8 4.325-1.817-2.548-4.65-4.325-8-4.325z'
      />
      <path
        fill='#2C8658'
        d='M82 38.667a2 2 0 0 0-2 2v2h-4.667a2 2 0 0 0-2 2V86a2 2 0 0 0 2 2h49.334a2 2 0 0 0 2-2V44.667a2 2 0 0 0-2-2H120v-2a2 2 0 0 0-2-2h-10c-3.35 0-6.183 1.777-8 4.325-1.817-2.548-4.65-4.325-8-4.325zm2 4h8c3.338 0 6 2.662 6 6v30.705c-1.677-1.265-3.748-2.039-6-2.039h-8V44.995a2 2 0 0 0 0-.649zm24 0h8v1.672a2 2 0 0 0 0 .648v32.346h-8c-2.252 0-4.323.774-6 2.04V48.666c0-3.338 2.662-6 6-6m-30.667 4H80v32.666a2 2 0 0 0 2 2h10A5.97 5.97 0 0 1 96.987 84H77.333zm42.667 0h2.667V84h-19.654A5.97 5.97 0 0 1 108 81.333h10a2 2 0 0 0 2-2z'
      />
    </g>
    <defs>
      <linearGradient
        id='blobby-icon-library_svg__b'
        x1={139.5}
        x2={52.354}
        y1={110}
        y2={24.156}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-library_svg__c' x1={135} x2={145} y1={59} y2={74} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-library_svg__d' x1={61} x2={71} y1={16} y2={31} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-library_svg__e' x1={55} x2={65} y1={96} y2={111} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-library_svg__f'
        x1={139.5}
        x2={52.354}
        y1={110}
        y2={24.156}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-library_svg__h'
        x1={93.276}
        x2={137.829}
        y1={68}
        y2={112.893}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-library_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconLibrary;
