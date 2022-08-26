import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgBlobbyIconHappy = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 200 128' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-happy_svg__a)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
        fill='#F0F4FF'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
        fill='url(#blobby-icon-happy_svg__b)'
        fillOpacity={0.2}
      />
      <path
        d='M56.999 35.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
        fill='url(#blobby-icon-happy_svg__c)'
      />
      <path
        d='M152.999 64.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
        fill='url(#blobby-icon-happy_svg__d)'
      />
      <path
        d='M84.999 93.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
        fill='url(#blobby-icon-happy_svg__e)'
      />
      <mask
        id='blobby-icon-happy_svg__g'
        style={{
          maskType: 'alpha',
        }}
        maskUnits='userSpaceOnUse'
        x={46}
        y={4}
        width={109}
        height={120}
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
          fill='#F0F4FF'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
          fill='url(#blobby-icon-happy_svg__f)'
          fillOpacity={0.2}
        />
      </mask>
      <g mask='url(#blobby-icon-happy_svg__g)'>
        <path opacity={0.25} d='M160.321 86.616 119.614 45.91 82.227 83.856l40.229 40.229 37.865-37.469Z' fill='url(#blobby-icon-happy_svg__h)' />
      </g>
      <path
        d='M73.333 64c0-14.704 11.963-26.667 26.667-26.667 14.704 0 26.667 11.963 26.667 26.667 0 14.704-11.963 26.667-26.667 26.667-14.704 0-26.667-11.963-26.667-26.667Z'
        fill='#F0F4FF'
      />
      <path
        d='M100 37.333c-14.704 0-26.667 11.963-26.667 26.667 0 14.704 11.963 26.667 26.667 26.667 14.704 0 26.667-11.963 26.667-26.667 0-14.704-11.963-26.667-26.667-26.667Zm0 4c12.542 0 22.667 10.125 22.667 22.667 0 12.542-10.125 22.667-22.667 22.667-12.542 0-22.667-10.125-22.667-22.667 0-12.542 10.125-22.667 22.667-22.667ZM92 54a3.333 3.333 0 1 0 0 6.667A3.333 3.333 0 0 0 92 54Zm16 0a3.333 3.333 0 1 0 0 6.666A3.333 3.333 0 0 0 108 54ZM89.031 69.313a2.001 2.001 0 0 0-1.588 3.257A15.961 15.961 0 0 0 100 78.667c5.076 0 9.631-2.379 12.557-6.097a1.99 1.99 0 0 0 .433-1.481 2.005 2.005 0 0 0-1.453-1.704 2 2 0 0 0-2.123.711 11.927 11.927 0 0 1-9.414 4.57c-3.83 0-7.22-1.781-9.414-4.57a2 2 0 0 0-1.555-.784Z'
        fill='#0067C8'
      />
    </g>
    <defs>
      <linearGradient id='blobby-icon-happy_svg__b' x1={126.563} y1={104} x2={75.218} y2={4.481} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-happy_svg__c' x1={47} y1={28} x2={57} y2={43} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-happy_svg__d' x1={143} y1={57} x2={153} y2={72} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-happy_svg__e' x1={75} y1={86} x2={85} y2={101} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-happy_svg__f' x1={126.563} y1={104} x2={75.218} y2={4.481} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-happy_svg__h' x1={93.765} y1={72.435} x2={133.246} y2={114.68} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <clipPath id='blobby-icon-happy_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);

export default SvgBlobbyIconHappy;