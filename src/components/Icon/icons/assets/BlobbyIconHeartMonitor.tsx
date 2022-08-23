import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgBlobbyIconHeartMonitor = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 200 128' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-heart-monitor_svg__a)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
        fill='#F0F4FF'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
        fill='url(#blobby-icon-heart-monitor_svg__b)'
        fillOpacity={0.2}
      />
      <path
        d='M146.999 101.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
        fill='url(#blobby-icon-heart-monitor_svg__c)'
      />
      <path
        d='M87.999 26.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
        fill='url(#blobby-icon-heart-monitor_svg__d)'
      />
      <path
        d='M63.999 77.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
        fill='url(#blobby-icon-heart-monitor_svg__e)'
      />
      <mask
        id='blobby-icon-heart-monitor_svg__g'
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
          d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
          fill='#F0F4FF'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
          fill='url(#blobby-icon-heart-monitor_svg__f)'
          fillOpacity={0.2}
        />
      </mask>
      <g mask='url(#blobby-icon-heart-monitor_svg__g)'>
        <path opacity={0.25} d='M159.7 77.7 125 43 75.64 85.641 107.5 117.5l52.2-39.8Z' fill='url(#blobby-icon-heart-monitor_svg__h)' />
      </g>
      <path
        d='M73.333 47.333c0-4.026 3.307-7.333 7.334-7.333h38.666c4.027 0 7.334 3.307 7.334 7.333v33.334c0 4.026-3.307 7.333-7.334 7.333H80.667c-4.027 0-7.334-3.307-7.334-7.333V47.333Z'
        fill='#F0F4FF'
      />
      <path
        d='M80.667 40c-4.027 0-7.334 3.307-7.334 7.333v33.334c0 4.026 3.307 7.333 7.334 7.333h38.666c4.027 0 7.334-3.307 7.334-7.333V47.333c0-4.026-3.307-7.333-7.334-7.333H80.667Zm0 4h38.666a3.304 3.304 0 0 1 3.334 3.333v33.334A3.304 3.304 0 0 1 119.333 84H80.667a3.304 3.304 0 0 1-3.334-3.333V68h3.334c.702 0 1.353-.367 1.713-.971l2.024-3.367 3.768 8.484a2.003 2.003 0 0 0 1.82 1.187c.796-.032 1.503-.456 1.828-1.171l4.623-10.172 5.007 14.018a1.996 1.996 0 0 0 1.883 1.325 2 2 0 0 0 1.789-1.104l4.782-9.562h1.432A3.327 3.327 0 0 0 114 68a3.333 3.333 0 1 0-2.664-5.333h-2.669c-.758 0-1.451.426-1.789 1.104l-3.237 6.476-5.092-14.255a1.998 1.998 0 0 0-1.8-1.323 1.974 1.974 0 0 0-1.903 1.17l-4.825 10.617-3.529-7.935a2 2 0 0 0-3.542-.216L79.534 64h-2.2V47.333A3.304 3.304 0 0 1 80.666 44Z'
        fill='#0067C8'
      />
    </g>
    <defs>
      <linearGradient id='blobby-icon-heart-monitor_svg__b' x1={126.5} y1={104} x2={75.5} y2={4} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-heart-monitor_svg__c' x1={137} y1={94} x2={147} y2={109} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-heart-monitor_svg__d' x1={78} y1={19} x2={88} y2={34} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-heart-monitor_svg__e' x1={54} y1={70} x2={64} y2={85} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-heart-monitor_svg__f' x1={126.5} y1={104} x2={75.5} y2={4} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-heart-monitor_svg__h' x1={92.5} y1={71.169} x2={124.184} y2={105.072} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <clipPath id='blobby-icon-heart-monitor_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);

export default SvgBlobbyIconHeartMonitor;
