import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconSite = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-site_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.256 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-site_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.256 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-site_svg__c)'
        d='M146.999 100.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-site_svg__d)'
        d='M87.999 25.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-site_svg__e)'
        d='M63.999 76.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <mask
        id='blobby-icon-site_svg__g'
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
          fill='url(#blobby-icon-site_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.256 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-site_svg__g)'>
        <path
          fill='url(#blobby-icon-site_svg__h)'
          d='m146.963 80.963-33.638-33.638L94.5 74.5 77.5 88l27.5 27.5z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M99.999 40c-8.813 0-16 7.187-16 16 0 3.943 2.338 8.328 4.99 12.688a99 99 0 0 0 3.02 4.645 140 140 0 0 0 4.633 6.326c1.67 2.151 5.044 2.151 6.714 0a140 140 0 0 0 4.634-6.326 100 100 0 0 0 3.019-4.645c2.652-4.36 4.99-8.745 4.99-12.688 0-8.813-7.187-16-16-16'
      />
      <path
        fill='#EAF3DC'
        d='M103.356 79.659c-1.67 2.151-5.044 2.151-6.714 0a140 140 0 0 1-4.634-6.326h-8.376a4.67 4.67 0 0 0-4.266 2.771l-2.96 6.667a4.65 4.65 0 0 0 .348 4.437 4.65 4.65 0 0 0 3.914 2.125h38.659c1.585 0 3.05-.794 3.914-2.125a4.65 4.65 0 0 0 .352-4.437l-2.961-6.667a4.67 4.67 0 0 0-4.266-2.77h-8.376a140 140 0 0 1-4.634 6.325'
      />
      <path
        fill='#2C8658'
        d='M99.999 40c-8.813 0-16 7.187-16 16 0 3.943 2.338 8.328 4.99 12.688 2.651 4.359 5.742 8.507 7.653 10.97 1.67 2.152 5.044 2.152 6.714 0 1.911-2.463 5.002-6.611 7.653-10.97 2.652-4.36 4.99-8.745 4.99-12.688 0-8.813-7.187-16-16-16m0 4c6.651 0 12 5.349 12 12 0 2.067-1.89 6.469-4.409 10.61-2.518 4.14-5.539 8.205-7.396 10.598-.133.171-.258.171-.39 0-1.857-2.393-4.878-6.458-7.396-10.599-2.519-4.14-4.409-8.542-4.409-10.609 0-6.651 5.349-12 12-12m0 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M83.632 73.333a4.67 4.67 0 0 0-4.266 2.771l-2.96 6.667a4.65 4.65 0 0 0 .348 4.437 4.65 4.65 0 0 0 3.914 2.125h38.659c1.585 0 3.05-.794 3.914-2.125a4.65 4.65 0 0 0 .352-4.437l-2.961-6.667a4.67 4.67 0 0 0-4.266-2.77h-4.341a119 119 0 0 1-2.766 4h7.107c.263 0 .503.154.61.395l2.96 6.667a.65.65 0 0 1-.049.635.65.65 0 0 1-.557.302H80.668a.65.65 0 0 1-.56-.304.65.65 0 0 1-.05-.633l2.964-6.667a.67.67 0 0 1 .61-.396h7.104a116 116 0 0 1-2.763-4z'
      />
    </g>
    <defs>
      <linearGradient id='blobby-icon-site_svg__b' x1={125.5} x2={50} y1={101.5} y2={26} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-site_svg__c' x1={137} x2={147} y1={93} y2={108} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-site_svg__d' x1={78} x2={88} y1={18} y2={33} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-site_svg__e' x1={54} x2={64} y1={69} y2={84} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-site_svg__f' x1={125.5} x2={50} y1={101.5} y2={26} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-site_svg__h'
        x1={94.5}
        x2={126.628}
        y1={70.114}
        y2={100.721}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-site_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconSite;
