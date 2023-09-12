import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgUploadCloud = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#upload-cloud_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#upload-cloud_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#upload-cloud_svg__c)'
        d='M108.999 106.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#upload-cloud_svg__d)'
        d='M142.999 19.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#upload-cloud_svg__e)'
        d='M66.999 42.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <mask
        id='upload-cloud_svg__g'
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
          fill='url(#upload-cloud_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M97.492 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C39.75 96.3 45.34 68.141 53.67 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#upload-cloud_svg__g)'>
        <path fill='url(#upload-cloud_svg__h)' d='M155.247 93.985 110.72 49.458 74.964 78.966l45.07 45.069 35.213-30.05Z' opacity={0.25} />
      </g>
      <path
        fill='#EAF3DC'
        d='M84.057 60c.679-8.2 7.57-14.667 15.943-14.667S115.264 51.8 115.943 60h.724C122.916 60 128 65.084 128 71.333c0 6.25-5.084 11.334-11.333 11.334H83.333C77.084 82.667 72 77.583 72 71.333 72 65.084 77.084 60 83.333 60h.724Z'
      />
      <path
        fill='#2C8658'
        d='M100 45.333c-8.373 0-15.264 6.467-15.943 14.667h-.724C77.084 60 72 65.084 72 71.333c0 6.25 5.084 11.334 11.333 11.334h12v-4h-12c-4.044 0-7.333-3.29-7.333-7.334S79.29 64 83.333 64H86a2 2 0 0 0 2-2v-.667c0-6.616 5.384-12 12-12s12 5.384 12 12V62a2 2 0 0 0 2 2h2.667c4.044 0 7.333 3.29 7.333 7.333 0 4.044-3.289 7.334-7.333 7.334h-12v4h12c6.249 0 11.333-5.084 11.333-11.334C128 65.084 122.916 60 116.667 60h-.724c-.679-8.2-7.57-14.667-15.943-14.667Zm-.031 18.638a2 2 0 0 0-1.565.797l-5.818 5.818a2.002 2.002 0 0 0 .63 3.295 2.002 2.002 0 0 0 2.198-.467L98 70.828V86a2.002 2.002 0 0 0 2.772 1.874A2.004 2.004 0 0 0 102 86V70.828l2.586 2.586a1.998 1.998 0 0 0 2.857.03 2.01 2.01 0 0 0 .586-1.436 2.007 2.007 0 0 0-.615-1.422l-5.828-5.828a2.003 2.003 0 0 0-1.617-.787Z'
      />
    </g>
    <defs>
      <linearGradient id='upload-cloud_svg__b' x1={133} x2={49.23} y1={114} y2={31.784} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='upload-cloud_svg__c' x1={99} x2={109} y1={99} y2={114} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='upload-cloud_svg__d' x1={133} x2={143} y1={12} y2={27} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='upload-cloud_svg__e' x1={57} x2={67} y1={35} y2={50} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='upload-cloud_svg__f' x1={133} x2={49.23} y1={114} y2={31.784} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='upload-cloud_svg__h' x1={89.408} x2={133.953} y1={67} y2={114.369} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='upload-cloud_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgUploadCloud;
