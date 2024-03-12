import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconHappy = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-happy_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-happy_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-happy_svg__c)'
        d='M56.999 34.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-happy_svg__d)'
        d='M152.999 63.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-happy_svg__e)'
        d='M84.999 92.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <mask
        id='blobby-icon-happy_svg__g'
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
          d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
          clipRule='evenodd'
        />
        <path
          fill='url(#blobby-icon-happy_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-happy_svg__g)'>
        <path
          fill='url(#blobby-icon-happy_svg__h)'
          d='M160.321 86.616 119.614 45.91 82.227 83.856l40.229 40.229 37.865-37.469Z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M73.333 64c0-14.704 11.963-26.667 26.667-26.667 14.704 0 26.667 11.963 26.667 26.667 0 14.704-11.963 26.667-26.667 26.667-14.704 0-26.667-11.963-26.667-26.667Z'
      />
      <path
        fill='#2C8658'
        d='M100 37.333c-14.704 0-26.667 11.963-26.667 26.667 0 14.704 11.963 26.667 26.667 26.667 14.704 0 26.667-11.963 26.667-26.667 0-14.704-11.963-26.667-26.667-26.667Zm0 4c12.542 0 22.667 10.125 22.667 22.667 0 12.542-10.125 22.667-22.667 22.667-12.542 0-22.667-10.125-22.667-22.667 0-12.542 10.125-22.667 22.667-22.667ZM92 54a3.333 3.333 0 1 0 0 6.667A3.333 3.333 0 0 0 92 54Zm16 0a3.333 3.333 0 1 0 0 6.666A3.333 3.333 0 0 0 108 54ZM89.031 69.313a2.001 2.001 0 0 0-1.588 3.257A15.961 15.961 0 0 0 100 78.667c5.076 0 9.631-2.379 12.557-6.097a1.99 1.99 0 0 0 .433-1.481 2.005 2.005 0 0 0-1.453-1.704 2 2 0 0 0-2.123.711 11.927 11.927 0 0 1-9.414 4.57c-3.83 0-7.22-1.781-9.414-4.57a2 2 0 0 0-1.555-.784Z'
      />
    </g>
    <defs>
      <linearGradient
        id='blobby-icon-happy_svg__b'
        x1={133}
        x2={49.23}
        y1={114}
        y2={31.784}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-happy_svg__c' x1={47} x2={57} y1={27} y2={42} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-happy_svg__d' x1={143} x2={153} y1={56} y2={71} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-happy_svg__e' x1={75} x2={85} y1={85} y2={100} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-happy_svg__f'
        x1={133}
        x2={49.23}
        y1={114}
        y2={31.784}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-happy_svg__h'
        x1={97.5}
        x2={143.326}
        y1={65.521}
        y2={107.483}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-happy_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconHappy;
