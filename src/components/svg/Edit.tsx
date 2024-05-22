import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEdit = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#edit_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M113.962 6.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.537-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C63.732 99.19 34.311 80.943 40.954 53.757c7.619-31.19 41-50.037 73.009-47.535'
        clipRule='evenodd'
      />
      <path
        fill='url(#edit_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M113.962 6.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.537-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C63.732 99.19 34.311 80.943 40.954 53.757c7.619-31.19 41-50.037 73.009-47.535'
        clipRule='evenodd'
      />
      <path
        fill='url(#edit_svg__c)'
        d='M146.999 100.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#edit_svg__d)'
        d='M87.999 25.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#edit_svg__e)'
        d='M63.999 76.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <mask
        id='edit_svg__g'
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
          fill='url(#edit_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M113.962 6.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.537-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C63.732 99.19 34.311 80.943 40.954 53.757c7.619-31.19 41-50.037 73.009-47.535'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#edit_svg__g)'>
        <path fill='url(#edit_svg__h)' d='m170.095 88.904-47.246-47.247-47.587 47.1 45.069 45.07z' opacity={0.25} />
      </g>
      <path
        fill='#EAF3DC'
        d='M109.401 41.401A9.3 9.3 0 0 1 116 38.68c2.393 0 4.786.907 6.599 2.721 3.628 3.628 3.628 9.57 0 13.198l-29.51 29.513a4.7 4.7 0 0 1-2.016 1.185l-.003.002-13.854 3.956a2 2 0 0 1-2.471-2.471L78.7 72.932a4.66 4.66 0 0 1 1.187-2.02z'
      />
      <path
        fill='#2C8658'
        d='M116 38.68a9.3 9.3 0 0 0-6.599 2.721l-29.513 29.51c-.56.56-.97 1.257-1.187 2.021l-3.956 13.852a2 2 0 0 0 2.471 2.471L91.07 85.3l.003-.002a4.7 4.7 0 0 0 2.016-1.185l29.51-29.513c3.628-3.628 3.628-9.57 0-13.198A9.3 9.3 0 0 0 116 38.68m0 3.976a5.3 5.3 0 0 1 3.768 1.573h.003c2.1 2.1 2.1 5.442 0 7.542l-2.586 2.586-7.542-7.542 2.586-2.586A5.32 5.32 0 0 1 116 42.656m-9.185 6.987 7.542 7.542-24.1 24.099a.7.7 0 0 1-.288.17l-10.39 2.968 2.968-10.393v-.003a.65.65 0 0 1 .17-.286z'
      />
    </g>
    <defs>
      <linearGradient id='edit_svg__b' x1={145.5} x2={54.2} y1={111.5} y2={21.651} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='edit_svg__c' x1={137} x2={147} y1={93} y2={108} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='edit_svg__d' x1={78} x2={88} y1={18} y2={33} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='edit_svg__e' x1={54} x2={64} y1={69} y2={84} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='edit_svg__f' x1={145.5} x2={54.2} y1={111.5} y2={21.651} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='edit_svg__h' x1={94.972} x2={143.686} y1={68.5} y2={115.822} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='edit_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgEdit;
