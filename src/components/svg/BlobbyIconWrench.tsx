import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconWrench = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 200 128' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-wrench_svg__a)'>
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
        fill='url(#blobby-icon-wrench_svg__b)'
        fillOpacity={0.2}
      />
      <path
        d='M146.999 101.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
        fill='url(#blobby-icon-wrench_svg__c)'
      />
      <path
        d='M87.999 26.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
        fill='url(#blobby-icon-wrench_svg__d)'
      />
      <path
        d='M63.999 77.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
        fill='url(#blobby-icon-wrench_svg__e)'
      />
      <mask
        id='blobby-icon-wrench_svg__g'
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
          fill='url(#blobby-icon-wrench_svg__f)'
          fillOpacity={0.2}
        />
      </mask>
      <g mask='url(#blobby-icon-wrench_svg__g)'>
        <path opacity={0.25} d='m161.281 84.159-43.2-43.2-39.64 46.502 40.36 40.359 42.48-43.661Z' fill='url(#blobby-icon-wrench_svg__h)' />
      </g>
      <path
        d='M110 38.667c-9.181 0-16.667 7.485-16.667 16.666 0 1.876.395 3.646.969 5.328L78.148 76.815h-.002c-2.847 2.847-2.846 7.524.002 10.37a7.342 7.342 0 0 0 5.185 2.148 7.342 7.342 0 0 0 5.185-2.148h.003l16.151-16.154c1.682.575 3.454.969 5.331.969 9.18 0 16.666-7.486 16.666-16.667 0-2.668-.647-5.187-1.755-7.414a1.996 1.996 0 0 0-2.403-1.012 2.002 2.002 0 0 0-.8.489l-9.159 9.156c-.528.528-1.2.781-1.885.781a2.634 2.634 0 0 1-1.886-.78 2.635 2.635 0 0 1 0-3.77v-.002l9.156-9.156a2 2 0 0 0-.523-3.203A16.593 16.593 0 0 0 110 38.667Z'
        fill='#F0F4FF'
      />
      <path
        d='M110 38.667c-9.181 0-16.667 7.485-16.667 16.666 0 1.876.395 3.646.969 5.328L78.148 76.815h-.002c-2.847 2.847-2.846 7.524.002 10.37a7.342 7.342 0 0 0 5.185 2.148 7.342 7.342 0 0 0 5.185-2.148h.003l16.151-16.154c1.682.575 3.454.969 5.331.969 9.18 0 16.666-7.486 16.666-16.667 0-2.668-.647-5.187-1.755-7.414a1.996 1.996 0 0 0-2.403-1.012 2.002 2.002 0 0 0-.8.489l-9.159 9.156c-.528.528-1.2.781-1.885.781a2.634 2.634 0 0 1-1.886-.78 2.635 2.635 0 0 1 0-3.77v-.002l9.156-9.156a2 2 0 0 0-.523-3.203A16.593 16.593 0 0 0 110 38.667Zm0 4c.999 0 1.966.122 2.896.343l-6.943 6.943c-2.588 2.586-2.588 6.841 0 9.427a6.672 6.672 0 0 0 4.714 1.953c1.703 0 3.42-.66 4.713-1.953l6.945-6.943A12.636 12.636 0 0 1 110.003 68c-1.812 0-3.523-.385-5.084-1.07a2 2 0 0 0-2.219.416l-17.01 17.01a3.3 3.3 0 0 1-2.357.977 3.3 3.3 0 0 1-2.36-.976 3.304 3.304 0 0 1 .004-4.714l17.01-17.008a2 2 0 0 0 .417-2.218 12.587 12.587 0 0 1-1.07-5.084A12.637 12.637 0 0 1 110 42.667Z'
        fill='#0067C8'
      />
    </g>
    <defs>
      <linearGradient id='blobby-icon-wrench_svg__b' x1={125.711} y1={104} x2={74.42} y2={4.404} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-wrench_svg__c' x1={137} y1={94} x2={147} y2={109} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-wrench_svg__d' x1={78} y1={19} x2={88} y2={34} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-wrench_svg__e' x1={54} y1={70} x2={64} y2={85} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-wrench_svg__f' x1={125.711} y1={104} x2={74.42} y2={4.404} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-wrench_svg__h' x1={92.923} y1={71.592} x2={133.216} y2={114.707} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <clipPath id='blobby-icon-wrench_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconWrench;
