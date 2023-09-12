import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconSparkles = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-sparkles_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-sparkles_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-sparkles_svg__c)'
        d='M144.999 66.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-sparkles_svg__d)'
        d='M70.999 23.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-sparkles_svg__e)'
        d='M64.999 103.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <mask
        id='blobby-icon-sparkles_svg__g'
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
          fill='url(#blobby-icon-sparkles_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-sparkles_svg__g)'>
        <path
          fill='url(#blobby-icon-sparkles_svg__h)'
          d='m160.564 97.752-49.295-49.295L109.5 60.5l-24.18-24L81.5 47 71 50.5l65.5 65.5-4 3-49-49-4.5 8-8 3.79 49.838 49.837 39.726-33.875Z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M83.898 36.003a2 2 0 0 0-1.796 1.364l-2.516 7.552-7.552 2.516a2 2 0 0 0 0 3.797l7.55 2.518 2.518 7.55a2 2 0 0 0 3.796 0l2.516-7.553 7.552-2.515a2 2 0 0 0 0-3.797l-7.552-2.516-2.516-7.552a2 2 0 0 0-2-1.364Zm26.021 12a2 2 0 0 0-1.823 1.385l-3.901 12.14-12.14 3.902a2 2 0 0 0 0 3.807l12.14 3.901 3.901 12.14a2.003 2.003 0 0 0 3.081 1.004c.343-.25.597-.6.727-1.003l3.901-12.141 12.14-3.901a2 2 0 0 0 0-3.807l-12.14-3.901-3.901-12.141a2.003 2.003 0 0 0-1.985-1.385Zm-28.02 21.333a2 2 0 0 0-1.797 1.365l-2.019 6.052-6.05 2.015a2 2 0 0 0 0 3.797l6.05 2.016 2.019 6.052a2 2 0 0 0 3.796 0l2.016-6.052 6.052-2.016a2 2 0 0 0 0-3.797l-6.05-2.018L83.9 70.7a2 2 0 0 0-2-1.364Z'
      />
      <path
        fill='#2C8658'
        d='M83.898 36.003a2 2 0 0 0-1.796 1.364l-2.516 7.552-7.552 2.516a2 2 0 0 0 0 3.797l7.55 2.518 2.518 7.55a2 2 0 0 0 3.796 0l2.516-7.553 7.552-2.515a2 2 0 0 0 0-3.797l-7.552-2.516-2.516-7.552a2 2 0 0 0-2-1.364ZM84 44.328l.935 2.805a2 2 0 0 0 1.266 1.265l2.804.935-2.804.935a2 2 0 0 0-1.266 1.266L84 54.339l-.935-2.805a2 2 0 0 0-1.266-1.266l-2.804-.935 2.804-.935a1.999 1.999 0 0 0 1.266-1.265L84 44.328Zm25.919 3.675a2 2 0 0 0-1.823 1.385l-3.901 12.14-12.14 3.902a2 2 0 0 0 0 3.807l12.14 3.901 3.901 12.14a2.003 2.003 0 0 0 3.081 1.004c.343-.25.597-.6.727-1.003l3.901-12.141 12.14-3.901a2 2 0 0 0 0-3.807l-12.14-3.901-3.901-12.141a2.003 2.003 0 0 0-1.985-1.385Zm.081 8.53 2.313 7.196a2.003 2.003 0 0 0 1.291 1.292l7.196 2.312-7.196 2.313a2.007 2.007 0 0 0-1.291 1.291L110 78.133l-2.312-7.195a2.007 2.007 0 0 0-1.292-1.292l-7.195-2.313 7.195-2.312a2.005 2.005 0 0 0 1.292-1.292L110 56.534ZM81.898 69.337a2 2 0 0 0-1.796 1.365l-2.019 6.052-6.05 2.015a2 2 0 0 0 0 3.797l6.05 2.016 2.019 6.052a2 2 0 0 0 3.796 0l2.016-6.052 6.052-2.016a2 2 0 0 0 0-3.797l-6.05-2.018L83.9 70.7a2 2 0 0 0-2-1.364ZM82 77.659l.435 1.307a2 2 0 0 0 1.266 1.266l1.304.435-1.304.435a1.999 1.999 0 0 0-1.266 1.265L82 83.674l-.437-1.307a2 2 0 0 0-1.266-1.265l-1.305-.435 1.305-.435a2 2 0 0 0 1.266-1.266L82 77.66Z'
      />
    </g>
    <defs>
      <linearGradient id='blobby-icon-sparkles_svg__b' x1={133} x2={49.23} y1={114} y2={31.784} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-sparkles_svg__c' x1={135} x2={145} y1={59} y2={74} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-sparkles_svg__d' x1={61} x2={71} y1={16} y2={31} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-sparkles_svg__e' x1={55} x2={65} y1={96} y2={111} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-sparkles_svg__f' x1={133} x2={49.23} y1={114} y2={31.784} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-sparkles_svg__h' x1={71.381} x2={144.581} y1={50.5} y2={109.984} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-sparkles_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconSparkles;
