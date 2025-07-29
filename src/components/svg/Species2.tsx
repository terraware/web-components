import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSpecies2 = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#species2_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.068-50.066 6.08-21.874 15.757-46.304 38.382-48.19'
        clipRule='evenodd'
      />
      <path
        fill='url(#species2_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.068-50.066 6.08-21.874 15.757-46.304 38.382-48.19'
        clipRule='evenodd'
      />
      <path
        fill='url(#species2_svg__c)'
        d='M144.999 66.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#species2_svg__d)'
        d='M70.999 23.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#species2_svg__e)'
        d='M64.999 103.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <mask
        id='species2_svg__g'
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
          fill='url(#species2_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.068-50.066 6.08-21.874 15.757-46.304 38.382-48.19'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#species2_svg__g)'>
        <path
          fill='url(#species2_svg__h)'
          d='m126.786 122.661 27.568-33.52-34.107-34.108-5.646-.346-17.15-17.15-17.461 14.42 8.124 8.124V83.99z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M78.667 40.667c0-2.554 2.113-4.667 4.666-4.667H94c2.553 0 4.667 2.113 4.667 4.667v8c0 2.553-2.114 4.666-4.667 4.666h-3.333V60h10.666v-2c0-2.553 2.114-4.667 4.667-4.667h10.667c2.553 0 4.666 2.114 4.666 4.667v8c0 2.553-2.113 4.667-4.666 4.667H106c-2.553 0-4.667-2.114-4.667-4.667v-2H90.667v16.667c0 .393.273.666.666.666h10v-2c0-2.553 2.114-4.666 4.667-4.666h10.667c2.553 0 4.666 2.113 4.666 4.666v8c0 2.554-2.113 4.667-4.666 4.667H106c-2.553 0-4.667-2.113-4.667-4.667v-2h-10c-2.553 0-4.666-2.113-4.666-4.666V53.333h-3.334c-2.553 0-4.666-2.113-4.666-4.666z'
      />
      <path
        fill='#2C8658'
        d='M83.333 36c-2.553 0-4.666 2.113-4.666 4.667v8c0 2.553 2.113 4.666 4.666 4.666h3.334v27.334c0 2.553 2.113 4.666 4.666 4.666h10v2c0 2.554 2.114 4.667 4.667 4.667h10.667c2.553 0 4.666-2.113 4.666-4.667v-8c0-2.553-2.113-4.666-4.666-4.666H106c-2.553 0-4.667 2.113-4.667 4.666v2h-10c-.393 0-.666-.273-.666-.666V64h10.666v2c0 2.553 2.114 4.667 4.667 4.667h10.667c2.553 0 4.666-2.114 4.666-4.667v-8c0-2.553-2.113-4.667-4.666-4.667H106c-2.553 0-4.667 2.114-4.667 4.667v2H90.667v-6.667H94c2.553 0 4.667-2.113 4.667-4.666v-8C98.667 38.113 96.553 36 94 36zm0 4H94c.394 0 .667.273.667.667v8c0 .393-.273.666-.667.666h-5.005a2 2 0 0 0-.649 0h-5.013c-.393 0-.666-.273-.666-.666v-8c0-.394.273-.667.666-.667M106 57.333h10.667c.393 0 .666.274.666.667v8c0 .393-.273.667-.666.667H106c-.393 0-.667-.274-.667-.667v-3.672a2 2 0 0 0 0-.648V58c0-.393.274-.667.667-.667m0 21.334h10.667c.393 0 .666.273.666.666v8c0 .394-.273.667-.666.667H106c-.393 0-.667-.273-.667-.667v-3.671a2 2 0 0 0 0-.649v-3.68c0-.393.274-.666.667-.666'
      />
    </g>
    <defs>
      <linearGradient id='species2_svg__b' x1={139.5} x2={52.354} y1={110} y2={24.156} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='species2_svg__c' x1={135} x2={145} y1={59} y2={74} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='species2_svg__d' x1={61} x2={71} y1={16} y2={31} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='species2_svg__e' x1={55} x2={65} y1={96} y2={111} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='species2_svg__f' x1={139.5} x2={52.354} y1={110} y2={24.156} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='species2_svg__h' x1={79.642} x2={145.224} y1={54} y2={99.97} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='species2_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSpecies2;
