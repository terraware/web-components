import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgBlobbyIconLibrary = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 200 128' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-library_svg__a)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.069-50.066C53.656 30.547 63.332 6.117 85.958 4.23Z'
        fill='#F0F4FF'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.069-50.066C53.656 30.547 63.332 6.117 85.958 4.23Z'
        fill='url(#blobby-icon-library_svg__b)'
        fillOpacity={0.2}
      />
      <path
        d='M144.999 67.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
        fill='url(#blobby-icon-library_svg__c)'
      />
      <path
        d='M70.999 24.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
        fill='url(#blobby-icon-library_svg__d)'
      />
      <path
        d='M64.999 104.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
        fill='url(#blobby-icon-library_svg__e)'
      />
      <mask
        id='blobby-icon-library_svg__g'
        style={{
          maskType: 'alpha',
        }}
        maskUnits='userSpaceOnUse'
        x={45}
        y={4}
        width={110}
        height={120}
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.069-50.066C53.656 30.547 63.332 6.117 85.958 4.23Z'
          fill='#F0F4FF'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.069-50.066C53.656 30.547 63.332 6.117 85.958 4.23Z'
          fill='url(#blobby-icon-library_svg__f)'
          fillOpacity={0.2}
        />
      </mask>
      <g mask='url(#blobby-icon-library_svg__g)'>
        <path opacity={0.25} d='m164.713 81.885-38.652-38.652-52.09 44.233 42.362 42.36 48.38-47.94Z' fill='url(#blobby-icon-library_svg__h)' />
      </g>
      <path
        d='M82 38.667a2 2 0 0 0-2 2v2h-4.667a2 2 0 0 0-2 2V86a2 2 0 0 0 2 2h49.334a2 2 0 0 0 2-2V44.667a2 2 0 0 0-2-2H120v-2a2 2 0 0 0-2-2h-10c-3.35 0-6.183 1.777-8 4.325-1.817-2.548-4.65-4.325-8-4.325H82Z'
        fill='#F0F4FF'
      />
      <path
        d='M82 38.667a2 2 0 0 0-2 2v2h-4.667a2 2 0 0 0-2 2V86a2 2 0 0 0 2 2h49.334a2 2 0 0 0 2-2V44.667a2 2 0 0 0-2-2H120v-2a2 2 0 0 0-2-2h-10c-3.35 0-6.183 1.777-8 4.325-1.817-2.548-4.65-4.325-8-4.325H82Zm2 4h8c3.338 0 6 2.662 6 6v30.705c-1.677-1.265-3.748-2.039-6-2.039h-8V44.995a1.999 1.999 0 0 0 0-.649v-1.68Zm24 0h8v1.672a2.016 2.016 0 0 0 0 .648v32.346h-8c-2.252 0-4.323.774-6 2.04V48.666c0-3.338 2.662-6 6-6Zm-30.667 4H80v32.666a2 2 0 0 0 2 2h10A5.973 5.973 0 0 1 96.987 84H77.333V46.667Zm42.667 0h2.667V84h-19.654A5.972 5.972 0 0 1 108 81.333h10a2 2 0 0 0 2-2V46.667Z'
        fill='#0067C8'
      />
    </g>
    <defs>
      <linearGradient id='blobby-icon-library_svg__b' x1={125.711} y1={104} x2={74.42} y2={4.404} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-library_svg__c' x1={135} y1={60} x2={145} y2={75} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-library_svg__d' x1={61} y1={17} x2={71} y2={32} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-library_svg__e' x1={55} y1={97} x2={65} y2={112} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-library_svg__f' x1={125.711} y1={104} x2={74.42} y2={4.404} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-library_svg__h' x1={92.923} y1={71.592} x2={133.216} y2={114.707} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <clipPath id='blobby-icon-library_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);

export default SvgBlobbyIconLibrary;
