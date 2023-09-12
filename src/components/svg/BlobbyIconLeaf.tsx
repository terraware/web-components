import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconLeaf = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-leaf_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.069-50.066C53.656 30.547 63.332 6.117 85.958 4.23Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-leaf_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.069-50.066C53.656 30.547 63.332 6.117 85.958 4.23Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-leaf_svg__c)'
        d='M108.999 106.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-leaf_svg__d)'
        d='M142.999 19.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-leaf_svg__e)'
        d='M66.999 42.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <mask
        id='blobby-icon-leaf_svg__g'
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
          fill='url(#blobby-icon-leaf_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M85.957 4.231c27.911-2.327 55.85 13.068 64.879 39.58 9.385 27.56-1.432 58.971-25.993 74.602-21.169 13.473-47.12.371-66.2-15.926-14.37-12.272-16.13-31.86-11.069-50.066C53.656 30.547 63.332 6.117 85.958 4.23Z'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-leaf_svg__g)'>
        <path fill='url(#blobby-icon-leaf_svg__h)' d='m162.332 85.1-47.037-47.036L93.5 81.5l-15.606 8.552 40.23 40.23L162.332 85.1Z' opacity={0.25} />
      </g>
      <path
        fill='#EAF3DC'
        d='M109.57 36.79a6.012 6.012 0 0 1 1.805-.243 6.024 6.024 0 0 1 4.685 2.362c6.542 8.594 9.174 19.043 9.268 26.146.097 7.183-1.731 12.972-4.966 17.052-3.236 4.08-7.889 6.357-12.951 6.557l-.039.003h-.039c-1.998 0-5.922-.054-9.88-3.079l-.003-.001c-.24-.17-3.12-2.22-3.958-4.791-.287-.467-3.98 1.465-5.344 1.134-2.28-.8-4.527-1.99-6.497-3.873-3.148-3.008-5.568-7.342-5.568-12.455 0-2.755.313-6.218 2.5-9.873l.026-.044.032-.044C86.3 44.232 103.038 38.71 109.57 36.789Z'
      />
      <path
        fill='#2C8658'
        d='M111.375 36.547a6.012 6.012 0 0 0-1.805.242c-6.531 1.921-23.27 7.443-30.93 18.852l-.03.044-.027.044c-2.187 3.655-2.5 7.118-2.5 9.873 0 5.113 2.42 9.447 5.568 12.455 1.97 1.883 4.217 3.072 6.497 3.873a32.396 32.396 0 0 1-9.421 4.83 2 2 0 1 0 1.213 3.813c15.53-4.942 25.179-19.55 28.365-34.612a2.001 2.001 0 0 0-3.914-.828c-1.878 8.876-6.174 17.445-12.584 23.656-2.08-.14-5.024-1.361-7.393-3.625-2.508-2.397-4.33-5.712-4.33-9.562 0-2.476.217-4.92 1.916-7.78 6.45-9.545 22.493-15.37 28.698-17.194a2.011 2.011 0 0 1 2.18.703c5.892 7.74 8.371 17.649 8.453 23.776v.002c.087 6.478-1.557 11.302-4.102 14.51-2.539 3.202-5.969 4.878-9.948 5.043-1.993 0-4.396.045-7.4-2.25a1.998 1.998 0 0 0-3.206 1.05 2 2 0 0 0 .778 2.126c3.958 3.025 7.882 3.079 9.88 3.079h.039l.039-.003c5.062-.2 9.715-2.478 12.951-6.557 3.235-4.08 5.063-9.869 4.966-17.052-.094-7.103-2.726-17.552-9.268-26.146a6.024 6.024 0 0 0-4.685-2.362Z'
      />
    </g>
    <defs>
      <linearGradient id='blobby-icon-leaf_svg__b' x1={139.5} x2={52.354} y1={110} y2={24.156} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-leaf_svg__c' x1={99} x2={109} y1={99} y2={114} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-leaf_svg__d' x1={133} x2={143} y1={12} y2={27} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-leaf_svg__e' x1={57} x2={67} y1={35} y2={50} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-leaf_svg__f' x1={139.5} x2={52.354} y1={110} y2={24.156} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-leaf_svg__h' x1={93.085} x2={148.602} y1={59.755} y2={102.372} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-leaf_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconLeaf;
