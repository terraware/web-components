import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconHeartMonitor = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-heart-monitor_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-heart-monitor_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-heart-monitor_svg__c)'
        d='M146.999 100.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-heart-monitor_svg__d)'
        d='M87.999 25.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-heart-monitor_svg__e)'
        d='M63.999 76.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <mask
        id='blobby-icon-heart-monitor_svg__g'
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
          d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112'
          clipRule='evenodd'
        />
        <path
          fill='url(#blobby-icon-heart-monitor_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-heart-monitor_svg__g)'>
        <path
          fill='url(#blobby-icon-heart-monitor_svg__h)'
          d='M159.7 77.7 125 43 75.64 85.641 107.5 117.5z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M73.333 47.333c0-4.026 3.307-7.333 7.334-7.333h38.666c4.027 0 7.334 3.307 7.334 7.333v33.334c0 4.026-3.307 7.333-7.334 7.333H80.667c-4.027 0-7.334-3.307-7.334-7.333V47.333'
      />
      <path
        fill='#2C8658'
        d='M80.667 40c-4.027 0-7.334 3.307-7.334 7.333v33.334c0 4.026 3.307 7.333 7.334 7.333h38.666c4.027 0 7.334-3.307 7.334-7.333V47.333c0-4.026-3.307-7.333-7.334-7.333zm0 4h38.666a3.304 3.304 0 0 1 3.334 3.333v33.334A3.304 3.304 0 0 1 119.333 84H80.667a3.304 3.304 0 0 1-3.334-3.333V68h3.334c.702 0 1.353-.367 1.713-.971l2.024-3.367 3.768 8.484a2 2 0 0 0 1.82 1.187c.796-.032 1.503-.456 1.828-1.171l4.623-10.172 5.007 14.018a2 2 0 0 0 1.883 1.325 2 2 0 0 0 1.789-1.104l4.782-9.562h1.432A3.33 3.33 0 0 0 114 68a3.333 3.333 0 1 0-2.664-5.333h-2.669c-.758 0-1.451.426-1.789 1.104l-3.237 6.476-5.092-14.255a2 2 0 0 0-1.8-1.323 1.97 1.97 0 0 0-1.903 1.17l-4.825 10.617-3.529-7.935a2 2 0 0 0-3.542-.216L79.534 64h-2.2V47.333A3.304 3.304 0 0 1 80.666 44'
      />
    </g>
    <defs>
      <linearGradient
        id='blobby-icon-heart-monitor_svg__b'
        x1={126.5}
        x2={50}
        y1={104}
        y2={27.5}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-heart-monitor_svg__c'
        x1={137}
        x2={147}
        y1={93}
        y2={108}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-heart-monitor_svg__d'
        x1={78}
        x2={88}
        y1={18}
        y2={33}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-heart-monitor_svg__e'
        x1={54}
        x2={64}
        y1={69}
        y2={84}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-heart-monitor_svg__f'
        x1={126.5}
        x2={50}
        y1={104}
        y2={27.5}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-heart-monitor_svg__h'
        x1={96.5}
        x2={130.831}
        y1={64.048}
        y2={104.17}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-heart-monitor_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconHeartMonitor;
