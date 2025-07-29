import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconCloudChecked = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-cloud-checked_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M113.962 6.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.537-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C63.732 99.19 34.311 80.943 40.954 53.757c7.619-31.19 41-50.037 73.009-47.535'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-cloud-checked_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M113.962 6.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.537-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C63.732 99.19 34.311 80.943 40.954 53.757c7.619-31.19 41-50.037 73.009-47.535'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-cloud-checked_svg__c)'
        d='M144.999 66.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-cloud-checked_svg__d)'
        d='M70.999 23.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-cloud-checked_svg__e)'
        d='M64.999 103.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <mask
        id='blobby-icon-cloud-checked_svg__g'
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
          d='M113.962 6.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.537-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C63.732 99.19 34.311 80.943 40.954 53.757c7.619-31.19 41-50.037 73.009-47.535'
          clipRule='evenodd'
        />
        <path
          fill='url(#blobby-icon-cloud-checked_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M113.962 6.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.537-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C63.732 99.19 34.311 80.943 40.954 53.757c7.619-31.19 41-50.037 73.009-47.535'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-cloud-checked_svg__g)'>
        <path
          fill='url(#blobby-icon-cloud-checked_svg__h)'
          d='M162.5 95.795 113.205 46.5 71.431 78.93l49.837 49.838z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M84.057 60c.679-8.2 7.57-14.667 15.943-14.667S115.264 51.8 115.943 60h.724C122.916 60 128 65.084 128 71.333s-5.084 11.334-11.333 11.334H83.333C77.084 82.667 72 77.583 72 71.333 72 65.084 77.084 60 83.333 60z'
      />
      <path
        fill='#2C8658'
        d='M100 41.333c-9.987 0-18.227 7.614-19.227 17.334H80c-6.613 0-12 5.386-12 12s5.387 12 12 12h10.188l-4-4H80c-4.413 0-8-3.587-8-8s3.587-8 8-8h2.667c1.106 0 2-.894 2-2 0-8.454 6.88-15.334 15.333-15.334s15.333 6.88 15.333 15.334c0 1.106.894 2 2 2H120c4.413 0 8 3.586 8 8s-3.587 8-8 8h-12.214l-4.401 4H120c6.613 0 12-5.387 12-12s-5.387-12-12-12h-.773c-1-9.72-9.24-17.334-19.227-17.334m11.391 23.982a2 2 0 0 0-1.404.54L96.732 77.903l-6.651-6.651a2 2 0 1 0-2.828 2.828l8 8a2 2 0 0 0 2.76.065l14.667-13.333a2 2 0 0 0-1.289-3.498'
      />
    </g>
    <defs>
      <linearGradient
        id='blobby-icon-cloud-checked_svg__b'
        x1={145.5}
        x2={54.2}
        y1={111.5}
        y2={21.651}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-cloud-checked_svg__c'
        x1={135}
        x2={145}
        y1={59}
        y2={74}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-cloud-checked_svg__d'
        x1={61}
        x2={71}
        y1={16}
        y2={31}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-cloud-checked_svg__e'
        x1={55}
        x2={65}
        y1={96}
        y2={111}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-cloud-checked_svg__f'
        x1={145.5}
        x2={54.2}
        y1={111.5}
        y2={21.651}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-cloud-checked_svg__h'
        x1={88.4}
        x2={136.803}
        y1={65}
        y2={119.434}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-cloud-checked_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconCloudChecked;
