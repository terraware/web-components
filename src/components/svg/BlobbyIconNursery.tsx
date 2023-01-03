import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconNursery = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 200 128' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-nursery_svg__a)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.257 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663Z'
        fill='#F0F4FF'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.257 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663Z'
        fill='url(#blobby-icon-nursery_svg__b)'
        fillOpacity={0.2}
      />
      <path
        d='M60 82.449h.02c2.75 0 4.98 3.33 4.998 7.449.018-4.11 2.24-7.434 4.98-7.449-2.74-.015-4.962-3.34-4.98-7.449-.018 4.119-2.249 7.449-4.999 7.449H60Z'
        fill='url(#blobby-icon-nursery_svg__c)'
      />
      <path
        d='M124 104.449h.019c2.75 0 4.981 3.33 4.999 7.449.018-4.109 2.239-7.434 4.981-7.449-2.742-.015-4.963-3.34-4.981-7.449-.018 4.119-2.249 7.449-4.999 7.449H124Z'
        fill='url(#blobby-icon-nursery_svg__d)'
      />
      <path
        d='M130 24.449h.019c2.75 0 4.981 3.33 4.999 7.449.018-4.11 2.239-7.434 4.981-7.449-2.742-.015-4.963-3.34-4.981-7.449-.018 4.119-2.249 7.449-4.999 7.449H130Z'
        fill='url(#blobby-icon-nursery_svg__e)'
      />
      <mask
        id='blobby-icon-nursery_svg__g'
        style={{
          maskType: 'alpha',
        }}
        maskUnits='userSpaceOnUse'
        x={0}
        y={0}
        width={200}
        height={128}
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.257 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663Z'
          fill='#F0F4FF'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.257 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663Z'
          fill='url(#blobby-icon-nursery_svg__f)'
          fillOpacity={0.2}
        />
      </mask>
      <g mask='url(#blobby-icon-nursery_svg__g)'>
        <path opacity={0.25} d='m148.557 80.437-26.786-26.786-44.81 34.274 27.537 27.537 44.059-35.025Z' fill='url(#blobby-icon-nursery_svg__h)' />
      </g>
      <path
        d='m109.6 40.4 11.6 12.533c1.733 1.867 2.8 4.667 2.8 7.6v24.134c0 2.666-1.733 4.666-4 4.666H79.733c-2.133 0-3.733-2-3.733-4.666V60.533c0-2.933.933-5.733 2.4-7.6L88.933 40.4c.934-1.067 2.267-1.733 3.6-1.733h13.334v.133c1.333 0 2.666.533 3.733 1.6Z'
        fill='#F0F4FF'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='m109.6 40.4 11.6 12.533c1.733 1.867 2.8 4.667 2.8 7.6v24.134c0 2.666-1.733 4.666-4 4.666H79.733c-2.133 0-3.733-2-3.733-4.666V60.533c0-2.933.933-5.733 2.4-7.6L88.933 40.4c.934-1.067 2.267-1.733 3.6-1.733h13.334v.133c1.333 0 2.666.533 3.733 1.6Zm-17.467 2.667c.134-.267.4-.4.534-.4h7.466l-8 8.666-1.466 1.6c-1.334 1.467-2.267 3.467-2.534 5.6h-7.866c.266-1.2.666-2.266 1.333-2.933l3.467-4.267 7.066-8.266ZM118.4 55.6l-11.6-12.533c-.133-.134-.4-.4-.8-.4s-.667.266-.8.4L93.733 55.6c-.666.8-1.2 1.733-1.466 2.933h27.6c-.267-1.2-.8-2.133-1.467-2.933Zm1.6 6.933V78H92V62.533h28ZM88 78V62.533h-8V78h8Zm4.133 7.333C92 85.2 92 84.933 92 84.667V82h28v2.667c0 .156-.046.312-.084.442-.026.091-.049.17-.049.224H92.133ZM80 82v2.667c0 .266 0 .533.133.666H88V82h-8Z'
        fill='#2C8658'
      />
    </g>
    <defs>
      <linearGradient id='blobby-icon-nursery_svg__b' x1={125.5} y1={101.5} x2={49.5} y2={23.5} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-nursery_svg__c' x1={60} y1={75} x2={70} y2={90} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-nursery_svg__d' x1={124} y1={97} x2={134} y2={112} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-nursery_svg__e' x1={130} y1={17} x2={140} y2={32} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-nursery_svg__f' x1={125.5} y1={101.5} x2={49.5} y2={23.5} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-nursery_svg__h' x1={102.213} y1={68.573} x2={129.163} y2={97.412} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <clipPath id='blobby-icon-nursery_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconNursery;
