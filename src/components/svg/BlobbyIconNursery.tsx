import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconNursery = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-nursery_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.256 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-nursery_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.256 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-nursery_svg__c)'
        d='M60 81.449h.02c2.75 0 4.98 3.33 4.998 7.449.018-4.11 2.24-7.434 4.98-7.449-2.74-.015-4.962-3.34-4.98-7.449-.018 4.119-2.249 7.449-4.999 7.449z'
      />
      <path
        fill='url(#blobby-icon-nursery_svg__d)'
        d='M124 103.449h.019c2.75 0 4.981 3.33 4.999 7.449.018-4.109 2.239-7.434 4.981-7.449-2.742-.015-4.963-3.34-4.981-7.449-.018 4.119-2.249 7.449-4.999 7.449z'
      />
      <path
        fill='url(#blobby-icon-nursery_svg__e)'
        d='M130 23.449h.019c2.75 0 4.981 3.33 4.999 7.449.018-4.11 2.239-7.434 4.981-7.449-2.742-.015-4.963-3.34-4.981-7.449-.018 4.119-2.249 7.449-4.999 7.449z'
      />
      <mask
        id='blobby-icon-nursery_svg__g'
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
          d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.256 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663'
          clipRule='evenodd'
        />
        <path
          fill='url(#blobby-icon-nursery_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.256 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-nursery_svg__g)'>
        <path
          fill='url(#blobby-icon-nursery_svg__h)'
          d='m148.557 80.437-26.786-26.786-44.81 34.274 27.537 27.537z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='m109.6 40.4 11.6 12.533c1.733 1.867 2.8 4.667 2.8 7.6v24.134c0 2.666-1.733 4.666-4 4.666H79.733c-2.133 0-3.733-2-3.733-4.666V60.533c0-2.933.933-5.733 2.4-7.6L88.933 40.4c.934-1.067 2.267-1.733 3.6-1.733h13.334v.133c1.333 0 2.666.533 3.733 1.6'
      />
      <path
        fill='#2C8658'
        fillRule='evenodd'
        d='m109.6 40.4 11.6 12.533c1.733 1.867 2.8 4.667 2.8 7.6v24.134c0 2.666-1.733 4.666-4 4.666H79.733c-2.133 0-3.733-2-3.733-4.666V60.533c0-2.933.933-5.733 2.4-7.6L88.933 40.4c.934-1.067 2.267-1.733 3.6-1.733h13.334v.133c1.333 0 2.666.533 3.733 1.6m-17.467 2.667c.134-.267.4-.4.534-.4h7.466l-8 8.666-1.466 1.6c-1.334 1.467-2.267 3.467-2.534 5.6h-7.866c.266-1.2.666-2.266 1.333-2.933l3.467-4.267zM118.4 55.6l-11.6-12.533c-.133-.134-.4-.4-.8-.4s-.667.266-.8.4L93.733 55.6c-.666.8-1.2 1.733-1.466 2.933h27.6c-.267-1.2-.8-2.133-1.467-2.933m1.6 6.933V78H92V62.533zM88 78V62.533h-8V78zm4.133 7.333C92 85.2 92 84.933 92 84.667V82h28v2.667c0 .156-.046.312-.084.442-.026.091-.049.17-.049.224zM80 82v2.667c0 .266 0 .533.133.666H88V82z'
        clipRule='evenodd'
      />
    </g>
    <defs>
      <linearGradient
        id='blobby-icon-nursery_svg__b'
        x1={125.5}
        x2={50}
        y1={101.5}
        y2={26}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-nursery_svg__c'
        x1={69.999}
        x2={59.999}
        y1={88.898}
        y2={73.898}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-nursery_svg__d'
        x1={133.999}
        x2={123.999}
        y1={110.898}
        y2={95.898}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-nursery_svg__e'
        x1={139.999}
        x2={129.999}
        y1={30.898}
        y2={15.898}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-nursery_svg__f'
        x1={125.5}
        x2={50}
        y1={101.5}
        y2={26}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-nursery_svg__h'
        x1={96.5}
        x2={122.689}
        y1={71.951}
        y2={104.226}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-nursery_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconNursery;
