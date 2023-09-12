import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconPeople = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-people_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-people_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-people_svg__c)'
        d='M144.999 66.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-people_svg__d)'
        d='M70.999 23.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-people_svg__e)'
        d='M64.999 103.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <mask
        id='blobby-icon-people_svg__g'
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
          d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
          clipRule='evenodd'
        />
        <path
          fill='url(#blobby-icon-people_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-people_svg__g)'>
        <path
          fill='url(#blobby-icon-people_svg__h)'
          d='m110.5 42.5 41.175 41.175L112.5 115 82.783 85.282l23.968-9.03-15.968-15.97L110.5 42.5Z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M100 37.333c-7.34 0-13.333 5.994-13.333 13.334S92.66 64 100 64s13.333-5.993 13.333-13.333S107.34 37.333 100 37.333Zm-16.029 32c-2.906 0-5.304 2.399-5.304 5.305v2.029c0 4.805 3.039 8.523 7.075 10.75 4.037 2.227 9.149 3.25 14.258 3.25s10.221-1.023 14.258-3.25c3.442-1.9 6.032-4.933 6.758-8.75h.32v-4.029c0-2.906-2.401-5.305-5.307-5.305H83.971Z'
      />
      <path
        fill='#2C8658'
        d='M100 37.333c-7.34 0-13.333 5.994-13.333 13.334S92.66 64 100 64s13.333-5.993 13.333-13.333S107.34 37.333 100 37.333Zm0 4a9.303 9.303 0 0 1 9.333 9.334A9.303 9.303 0 0 1 100 60a9.303 9.303 0 0 1-9.333-9.333A9.303 9.303 0 0 1 100 41.333Zm-16.029 28c-2.906 0-5.304 2.399-5.304 5.305v2.029c0 4.805 3.039 8.523 7.075 10.75 4.037 2.227 9.149 3.25 14.258 3.25s10.221-1.023 14.258-3.25c3.442-1.9 6.032-4.933 6.758-8.75h.32v-4.029c0-2.906-2.401-5.305-5.307-5.305H83.971Zm0 4h32.058c.744 0 1.307.56 1.307 1.305v.029h-.003v2c0 3.194-1.794 5.477-5.007 7.25-3.214 1.773-7.768 2.75-12.326 2.75-4.557 0-9.112-.977-12.325-2.75-3.214-1.773-5.008-4.056-5.008-7.25v-2.029c0-.744.56-1.305 1.304-1.305Z'
      />
    </g>
    <defs>
      <linearGradient id='blobby-icon-people_svg__b' x1={126.5} x2={50} y1={104} y2={27.5} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-people_svg__c' x1={135} x2={145} y1={59} y2={74} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-people_svg__d' x1={61} x2={71} y1={16} y2={31} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-people_svg__e' x1={55} x2={65} y1={96} y2={111} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-people_svg__f' x1={126.5} x2={50} y1={104} y2={27.5} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-people_svg__h' x1={90.5} x2={136.049} y1={60.121} y2={97.834} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-people_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconPeople;
