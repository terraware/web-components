import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconSeedling = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-seedling_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M96.086 15.373c25.873-1.513 57.892.593 65.604 25.277 7.588 24.287-19.377 41.46-40.139 56.23-19.895 14.155-43.87 31.774-63.872 17.768-20.522-14.371-16.173-44.163-7.146-67.498 7.376-19.065 25.103-30.582 45.553-31.777Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-seedling_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M96.086 15.373c25.873-1.513 57.892.593 65.604 25.277 7.588 24.287-19.377 41.46-40.139 56.23-19.895 14.155-43.87 31.774-63.872 17.768-20.522-14.371-16.173-44.163-7.146-67.498 7.376-19.065 25.103-30.582 45.553-31.777Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-seedling_svg__c)'
        d='M146.999 100.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-seedling_svg__d)'
        d='M87.999 25.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-seedling_svg__e)'
        d='M63.999 76.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <mask
        id='blobby-icon-seedling_svg__g'
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
          d='M96.086 15.373c25.873-1.513 57.892.593 65.604 25.277 7.588 24.287-19.377 41.46-40.139 56.23-19.895 14.155-43.87 31.774-63.872 17.768-20.522-14.371-16.173-44.163-7.146-67.498 7.376-19.065 25.103-30.582 45.553-31.777Z'
          clipRule='evenodd'
        />
        <path
          fill='url(#blobby-icon-seedling_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M96.086 15.373c25.873-1.513 57.892.593 65.604 25.277 7.588 24.287-19.377 41.46-40.139 56.23-19.895 14.155-43.87 31.774-63.872 17.768-20.522-14.371-16.173-44.163-7.146-67.498 7.376-19.065 25.103-30.582 45.553-31.777Z'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-seedling_svg__g)'>
        <path
          fill='url(#blobby-icon-seedling_svg__h)'
          d='m155.155 73.04-31.877-31.877L71.271 56.86l9.698 9.698-.492.774 14.47 14.47-8.29 7.7 23.21 23.21 45.288-39.672Z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M84.823 37.427c.351-.043.702-.072 1.052-.086 1.05-.042 2.094.046 3.104.271 2.52.561 4.77 2.131 6.263 4.471a2 2 0 0 1 .35.136c.69.185 1.877.589 3.156 1.867.479.48.835 1.344 1.252 2.042.417-.698.773-1.563 1.253-2.042 1.272-1.273 2.453-1.678 3.148-1.865l.005-.002c.113-.056.231-.102.352-.136 1.493-2.34 3.743-3.91 6.263-4.471 2.694-.6 5.615-.22 8.32.995 5.41 2.43 9.992 8.361 9.992 16.86a1.994 1.994 0 0 1-1.068 1.769 2.003 2.003 0 0 1-2.064-.121c-1.494-1.027-3.202-.868-5.422-.248-2.221.62-4.543 1.8-7.162 1.8-3.112 0-6.249-1.29-8.427-3.677-1.06-1.087-2.162-2.326-3.19-3.49V64h16a2 2 0 1 1 0 4h-.878l-1.937 17.477c-.413 3.695-3.569 6.523-7.289 6.523h-15.79c-3.72 0-6.878-2.826-7.288-6.523L82.878 68H82a2 2 0 1 1 0-4h16V51.5c-2.357 2.576-2.206 2.48-3.19 3.49-2.177 2.387-5.315 3.677-8.427 3.677-2.619 0-4.941-1.18-7.162-1.8-2.22-.62-3.928-.779-5.421.248a2 2 0 0 1-3.133-1.649c0-8.498 4.582-14.428 9.992-16.86a14.483 14.483 0 0 1 4.164-1.179Z'
      />
      <path
        fill='#2C8658'
        d='M85.875 37.341c-.35.014-.7.043-1.052.086a14.483 14.483 0 0 0-4.164 1.18c-5.41 2.43-9.992 8.361-9.992 16.86a2.001 2.001 0 0 0 3.133 1.648c1.493-1.027 3.201-.868 5.421-.248s4.543 1.8 7.162 1.8c3.112 0 6.25-1.29 8.427-3.677a2.001 2.001 0 1 0-2.953-2.696c-1.332 1.46-3.52 2.373-5.474 2.373-1.123 0-3.474-.922-6.086-1.651-1.584-.443-3.412-.705-5.247-.461.87-5.31 3.857-8.776 7.25-10.3 1.999-.898 4.081-1.125 5.81-.74.47.105.842.357 1.257.545-4.802.942-7.552 3.971-7.552 3.971a2 2 0 1 0 3.037 2.604s3.059-3.83 9.458-2.666c.036.006.073.011.11.015 0 0 .579.01 1.5.93.92.92 2.08 2.8 2.08 7.086v10H82a2 2 0 1 0 0 4h.878l1.94 17.477c.41 3.697 3.568 6.523 7.289 6.523h15.789c3.72 0 6.876-2.828 7.289-6.523L117.122 68H118a2 2 0 1 0 0-4h-16V54c0-4.286 1.16-6.165 2.081-7.086.92-.92 1.496-.93 1.497-.93h.003l.109-.015c6.399-1.164 9.459 2.666 9.459 2.666a1.996 1.996 0 0 0 2.832.231 1.994 1.994 0 0 0 .693-1.375 1.998 1.998 0 0 0-.489-1.46s-2.75-3.03-7.552-3.971c.415-.188.788-.44 1.258-.544 1.728-.386 3.81-.16 5.81.74 3.392 1.523 6.379 4.989 7.25 10.299-1.835-.244-3.664.018-5.248.46-2.611.73-4.963 1.652-6.086 1.652-1.954 0-4.142-.912-5.474-2.373a1.995 1.995 0 0 0-2.186-.587 1.998 1.998 0 0 0-1.334 1.828 1.997 1.997 0 0 0 .567 1.455c2.178 2.387 5.315 3.677 8.427 3.677 2.619 0 4.941-1.18 7.162-1.8 2.22-.62 3.928-.779 5.422.248a1.998 1.998 0 0 0 3.132-1.649c0-8.498-4.582-14.428-9.992-16.86-2.705-1.215-5.626-1.594-8.32-.994-2.52.561-4.77 2.131-6.263 4.471a2.022 2.022 0 0 0-.357.138c-.695.187-1.876.592-3.148 1.865-.48.48-.836 1.344-1.253 2.042-.417-.698-.773-1.563-1.252-2.042-1.279-1.278-2.466-1.682-3.157-1.867a2 2 0 0 0-.349-.136c-1.493-2.34-3.743-3.91-6.263-4.471a12.027 12.027 0 0 0-3.104-.27ZM86.901 68h12.771c.215.035.434.035.648 0h12.779l-1.891 17.034A3.31 3.31 0 0 1 107.896 88h-15.79a3.306 3.306 0 0 1-3.312-2.964v-.002L86.901 68Z'
      />
    </g>
    <defs>
      <linearGradient id='blobby-icon-seedling_svg__b' x1={134} x2={81.938} y1={98.5} y2={16.32} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-seedling_svg__c' x1={137} x2={147} y1={93} y2={108} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-seedling_svg__d' x1={78} x2={88} y1={18} y2={33} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-seedling_svg__e' x1={54} x2={64} y1={69} y2={84} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-seedling_svg__f' x1={134} x2={81.938} y1={98.5} y2={16.32} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-seedling_svg__h' x1={81.801} x2={124.962} y1={49.5} y2={104.019} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-seedling_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconSeedling;