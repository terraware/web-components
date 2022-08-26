import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgUploadCloud = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 201 128' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M97.992 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C40.25 96.3 45.84 68.141 54.17 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
      fill='#F0F4FF'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M97.992 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C40.25 96.3 45.84 68.141 54.17 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
      fill='url(#upload-cloud_svg__a)'
      fillOpacity={0.2}
    />
    <mask
      id='upload-cloud_svg__c'
      style={{
        maskType: 'alpha',
      }}
      maskUnits='userSpaceOnUse'
      x={46}
      y={4}
      width={110}
      height={120}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M97.992 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C40.25 96.3 45.84 68.141 54.17 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
        fill='#F0F4FF'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M97.992 4.026c24.033-.76 45.335 14.966 53.284 37.66 8.572 24.47 4.488 52.73-16.101 68.491-22.132 16.943-53.93 19.23-75.615 1.718C40.25 96.3 45.84 68.141 54.17 44.76c7.4-20.77 21.784-40.036 43.822-40.734Z'
        fill='url(#upload-cloud_svg__b)'
        fillOpacity={0.2}
      />
    </mask>
    <g mask='url(#upload-cloud_svg__c)'>
      <path
        opacity={0.25}
        d='M82.261 57.438c.71-8.329 7.925-14.896 16.693-14.896 4.718 0 8.988 1.902 12.035 4.958 2.614 2.622 53.429 52.5 53.429 52.5l-39.79 20.519c1.28 3.055 1.815 4.981 1.13 4.981-3.315 0-52.727-48.5-52.727-48.5s-3.394-4.92-3.394-8.052c0-6.347 5.323-11.51 11.866-11.51h.758Z'
        fill='url(#upload-cloud_svg__d)'
      />
    </g>
    <path
      d='M52.5 82.449h.02c2.75 0 4.98 3.33 4.998 7.449.018-4.11 2.24-7.434 4.98-7.449-2.74-.015-4.962-3.34-4.98-7.449-.017 4.119-2.249 7.449-4.999 7.449H52.5Z'
      fill='url(#upload-cloud_svg__e)'
    />
    <path
      d='M116.5 104.449h.019c2.75 0 4.981 3.33 4.999 7.449.018-4.109 2.24-7.434 4.981-7.449-2.741-.015-4.963-3.34-4.981-7.449-.018 4.119-2.249 7.449-4.999 7.449h-.019Z'
      fill='url(#upload-cloud_svg__f)'
    />
    <path
      d='M122.5 24.449h.019c2.75 0 4.981 3.33 4.999 7.449.018-4.11 2.24-7.434 4.981-7.449-2.741-.015-4.963-3.34-4.981-7.449-.018 4.119-2.249 7.449-4.999 7.449h-.019Z'
      fill='url(#upload-cloud_svg__g)'
    />
    <path
      d='M82.261 57.438c.71-8.329 7.925-14.896 16.693-14.896 8.767 0 15.982 6.567 16.692 14.895h.758c6.543 0 11.867 5.164 11.867 11.51 0 6.348-5.324 11.511-11.867 11.511H81.503c-6.543 0-11.866-5.163-11.866-11.51 0-6.347 5.323-11.51 11.866-11.51h.758Z'
      fill='#F0F4FF'
    />
    <path
      d='M99 42.542c-8.504 0-15.502 6.567-16.192 14.895h-.735c-6.347 0-11.51 5.164-11.51 11.51 0 6.348 5.163 11.511 11.51 11.511H94.26v-4.062H82.073c-4.107 0-7.448-3.34-7.448-7.448 0-4.107 3.34-7.448 7.448-7.448h2.708a2.03 2.03 0 0 0 2.031-2.031v-.677c0-6.72 5.469-12.188 12.188-12.188s12.187 5.468 12.187 12.188v.677a2.03 2.03 0 0 0 2.032 2.031h2.708c4.107 0 7.448 3.34 7.448 7.448 0 4.107-3.341 7.448-7.448 7.448H103.74v4.062h12.187c6.347 0 11.51-5.163 11.51-11.51 0-6.347-5.163-11.51-11.51-11.51h-.735c-.689-8.329-7.688-14.896-16.192-14.896Zm-.032 18.929a2.031 2.031 0 0 0-1.59.81l-5.908 5.908a2.032 2.032 0 1 0 2.872 2.872l2.627-2.626v15.409a2.033 2.033 0 0 0 3.916.786c.1-.25.15-.517.146-.786v-15.41l2.627 2.627a2.029 2.029 0 0 0 2.901.03 2.017 2.017 0 0 0 .595-1.457 2.02 2.02 0 0 0-.624-1.445l-5.919-5.92a2.033 2.033 0 0 0-1.643-.798Z'
      fill='#0067C8'
    />
    <defs>
      <linearGradient id='upload-cloud_svg__a' x1={127.063} y1={104} x2={75.718} y2={4.481} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='upload-cloud_svg__b' x1={127.063} y1={104} x2={75.718} y2={4.481} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='upload-cloud_svg__d' x1={69.346} y1={42.619} x2={93.556} y2={79.204} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='upload-cloud_svg__e' x1={52.5} y1={75} x2={62.5} y2={90} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='upload-cloud_svg__f' x1={116.5} y1={97} x2={126.5} y2={112} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='upload-cloud_svg__g' x1={122.5} y1={17} x2={132.5} y2={32} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgUploadCloud;