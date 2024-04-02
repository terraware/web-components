import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconSeeds = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-seeds_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.069-50.066C53.656 30.547 63.332 6.117 85.958 4.23Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-seeds_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.069-50.066C53.656 30.547 63.332 6.117 85.958 4.23Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-seeds_svg__c)'
        d='M146.999 100.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-seeds_svg__d)'
        d='M87.999 25.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-seeds_svg__e)'
        d='M63.999 76.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <mask
        id='blobby-icon-seeds_svg__g'
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
          d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.069-50.066C53.656 30.547 63.332 6.117 85.958 4.23Z'
          clipRule='evenodd'
        />
        <path
          fill='url(#blobby-icon-seeds_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.069-50.066C53.656 30.547 63.332 6.117 85.958 4.23Z'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-seeds_svg__g)'>
        <path
          fill='url(#blobby-icon-seeds_svg__h)'
          d='M164.752 94.247 123 52.494 109.5 63.5 92 46 76 58l7.93 8.17V80.09L129 125.158l35.752-30.911Z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M84 42.667c-5.701 0-10.667 4.005-10.667 9.333S78.3 61.333 84 61.333 94.667 57.328 94.667 52 89.7 42.667 84 42.667Zm30.471 5.974c-2.225.037-4.365.836-6.013 2.484-3.767 3.767-3.088 10.11.943 14.14 4.031 4.032 10.374 4.71 14.141.943 3.767-3.767 3.088-10.11-.943-14.14-2.268-2.268-5.267-3.476-8.128-3.427ZM89.508 63.763c-3.66.036-7.05 1.835-8.56 5.172-2.196 4.854.675 10.551 5.87 12.9 2.05.928 4.251 1.23 6.302.97C94.905 85.984 98.56 88 102.667 88c5.701 0 10.666-4.005 10.666-9.333s-4.965-9.334-10.666-9.334c-.967 0-1.903.126-2.8.339-1.146-2.038-3.01-3.784-5.354-4.844a11.89 11.89 0 0 0-5.005-1.065Z'
      />
      <path
        fill='#2C8658'
        d='M84 42.667c-5.701 0-10.667 4.005-10.667 9.333S78.3 61.333 84 61.333 94.667 57.328 94.667 52 89.7 42.667 84 42.667Zm0 4c3.872 0 6.667 2.56 6.667 5.333S87.872 57.333 84 57.333s-6.667-2.56-6.667-5.333 2.795-5.333 6.667-5.333Zm30.471 1.974c-2.225.037-4.365.836-6.013 2.484-3.767 3.767-3.088 10.11.943 14.14 4.031 4.032 10.374 4.71 14.141.943 3.767-3.767 3.088-10.11-.943-14.14-2.268-2.268-5.267-3.476-8.128-3.427Zm.766 4.02c1.534.139 3.165.866 4.534 2.235 2.738 2.738 2.903 6.524.942 8.484-1.96 1.96-5.746 1.795-8.484-.943-2.738-2.737-2.903-6.523-.943-8.484.981-.98 2.417-1.43 3.951-1.292Zm-25.73 11.102c-3.659.036-7.05 1.835-8.56 5.172-2.195 4.854.676 10.551 5.87 12.9 2.05.928 4.252 1.23 6.303.97C94.905 85.984 98.56 88 102.667 88c5.701 0 10.666-4.005 10.666-9.333s-4.965-9.334-10.666-9.334c-.967 0-1.903.126-2.8.339-1.146-2.038-3.01-3.784-5.354-4.844a11.89 11.89 0 0 0-5.005-1.065Zm-.51 4.01c1.21-.107 2.545.103 3.868.7 3.527 1.597 5.017 5.082 3.875 7.608-1.143 2.526-4.744 3.705-8.271 2.11-3.528-1.597-5.02-5.082-3.878-7.608.714-1.579 2.39-2.631 4.406-2.81Zm13.67 5.56c3.872 0 6.666 2.56 6.666 5.334 0 2.773-2.794 5.333-6.666 5.333-2.447 0-4.488-1.082-5.636-2.531 1.436-.87 2.621-2.119 3.354-3.74a8.338 8.338 0 0 0 .696-4.237 8.162 8.162 0 0 1 1.586-.159Z'
      />
    </g>
    <defs>
      <linearGradient
        id='blobby-icon-seeds_svg__b'
        x1={139.5}
        x2={52.354}
        y1={110}
        y2={24.156}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-seeds_svg__c' x1={137} x2={147} y1={93} y2={108} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-seeds_svg__d' x1={78} x2={88} y1={18} y2={33} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-seeds_svg__e' x1={54} x2={64} y1={69} y2={84} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-seeds_svg__f'
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
        id='blobby-icon-seeds_svg__h'
        x1={82.375}
        x2={138.217}
        y1={53}
        y2={117.435}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-seeds_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconSeeds;
