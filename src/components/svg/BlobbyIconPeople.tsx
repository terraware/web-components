import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgBlobbyIconPeople = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 200 128' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M113.962 6.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.537-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C63.731 99.19 34.311 80.943 40.953 53.757c7.619-31.19 41-50.037 73.009-47.535Z'
      fill='#F0F4FF'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M113.962 6.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.537-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C63.731 99.19 34.311 80.943 40.953 53.757c7.619-31.19 41-50.037 73.009-47.535Z'
      fill='url(#blobby-icon-people_svg__a)'
      fillOpacity={0.2}
    />
    <mask
      id='blobby-icon-people_svg__c'
      style={{
        maskType: 'alpha',
      }}
      maskUnits='userSpaceOnUse'
      x={40}
      y={6}
      width={120}
      height={116}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M113.962 6.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.537-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C63.731 99.19 34.311 80.943 40.953 53.757c7.619-31.19 41-50.037 73.009-47.535Z'
        fill='#F0F4FF'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M113.962 6.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.537-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C63.731 99.19 34.311 80.943 40.953 53.757c7.619-31.19 41-50.037 73.009-47.535Z'
        fill='url(#blobby-icon-people_svg__b)'
        fillOpacity={0.2}
      />
    </mask>
    <g mask='url(#blobby-icon-people_svg__c)'>
      <path
        opacity={0.25}
        d='M98.5 39.416c-7.455 0-13.541 6.087-13.541 13.542 0 3.684 1.486 7.033 3.888 9.48C91.307 64.941 143.468 120 143.468 120l20.48-18.5s-53.392-55.575-55.795-58.021a13.501 13.501 0 0 0-9.653-4.063Zm-16.279 32.5c-2.952 0-5.388 2.436-5.388 5.388v2.06c0 2.51.817 4.728 2.167 6.597 1.276 1.767 42.47 44.841 42.47 44.841s14.36 5.3 19.549 5.3 10.381-1.039 14.481-3.3c3.495-1.929 7.711-3.426 8.448-7.302l-1.259-1.585-42.52-46.61c0-1.24-.43-2.39-1.148-3.305a5.397 5.397 0 0 0-4.242-2.084H82.221Z'
        fill='url(#blobby-icon-people_svg__d)'
      />
    </g>
    <path
      d='M145.999 96.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      fill='url(#blobby-icon-people_svg__e)'
    />
    <path
      d='M86.999 21.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      fill='url(#blobby-icon-people_svg__f)'
    />
    <path
      d='M62.999 72.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      fill='url(#blobby-icon-people_svg__g)'
    />
    <path
      d='M98.5 39.417c-7.455 0-13.541 6.087-13.541 13.542 0 7.454 6.086 13.541 13.541 13.541s13.542-6.087 13.542-13.541c0-7.455-6.087-13.542-13.542-13.542Zm-16.279 32.5c-2.952 0-5.388 2.436-5.388 5.388v2.06c0 4.88 3.087 8.656 7.187 10.918 4.1 2.262 9.291 3.3 14.48 3.3s10.381-1.038 14.481-3.3c3.495-1.929 6.126-5.01 6.863-8.887h.325v-4.091c0-2.952-2.438-5.388-5.39-5.388H82.221Z'
      fill='#F0F4FF'
    />
    <path
      d='M98.5 39.416c-7.455 0-13.542 6.087-13.542 13.542S91.045 66.5 98.5 66.5s13.542-6.087 13.542-13.542-6.087-13.541-13.542-13.541Zm0 4.063c5.259 0 9.479 4.22 9.479 9.48 0 5.258-4.22 9.478-9.48 9.478-5.258 0-9.478-4.22-9.478-9.479 0-5.26 4.22-9.479 9.479-9.479ZM82.22 71.917c-2.951 0-5.387 2.435-5.387 5.387v2.06c0 4.881 3.087 8.657 7.186 10.918 4.1 2.262 9.292 3.301 14.48 3.301 5.19 0 10.382-1.039 14.482-3.3 3.495-1.93 6.126-5.01 6.863-8.887h.325v-4.092c0-2.952-2.438-5.388-5.39-5.388H82.221Zm0 4.062h32.559c.756 0 1.328.57 1.328 1.325v.03h-.003v2.03c0 3.245-1.822 5.563-5.086 7.364-3.264 1.8-7.889 2.793-12.518 2.793-4.629 0-9.254-.993-12.518-2.793-3.264-1.801-5.086-4.12-5.086-7.364v-2.06c0-.756.569-1.325 1.325-1.325Z'
      fill='#2C8658'
    />
    <defs>
      <linearGradient id='blobby-icon-people_svg__a' x1={128.7} y1={101.934} x2={83.492} y2={1.371} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-people_svg__b' x1={128.7} y1={101.934} x2={83.492} y2={1.371} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-people_svg__d' x1={76.402} y1={39.613} x2={142.934} y2={98.193} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-people_svg__e' x1={136} y1={89} x2={146} y2={104} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-people_svg__f' x1={77} y1={14} x2={87} y2={29} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-people_svg__g' x1={53} y1={65} x2={63} y2={80} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgBlobbyIconPeople;
