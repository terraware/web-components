import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgEdit = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 201 128' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M112.962 4.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.536-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C62.731 97.19 33.311 78.943 39.953 51.757c7.619-31.19 41-50.037 73.009-47.535Z'
      fill='#F0F4FF'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M112.962 4.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.536-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C62.731 97.19 33.311 78.943 39.953 51.757c7.619-31.19 41-50.037 73.009-47.535Z'
      fill='url(#edit_svg__a)'
      fillOpacity={0.2}
    />
    <mask
      id='edit_svg__c'
      style={{
        maskType: 'alpha',
      }}
      maskUnits='userSpaceOnUse'
      x={39}
      y={4}
      width={120}
      height={116}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M112.962 4.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.536-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C62.731 97.19 33.311 78.943 39.953 51.757c7.619-31.19 41-50.037 73.009-47.535Z'
        fill='#F0F4FF'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M112.962 4.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.536-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C62.731 97.19 33.311 78.943 39.953 51.757c7.619-31.19 41-50.037 73.009-47.535Z'
        fill='url(#edit_svg__b)'
        fillOpacity={0.2}
      />
    </mask>
    <g mask='url(#edit_svg__c)'>
      <path
        opacity={0.25}
        d='M108.5 56.248c-8.95 0-6.092-1.048-6.092 7.902 0 4.004-17.284-2.317-14.591 2.11 2.692 4.428 5.832 8.641 7.773 11.143 1.696 2.186 5.122 2.186 6.818 0 1.941-2.502 24.899 60.524 27.592 56.097 2.693-4.427 39.819-36.472 39.819-40.476 0-4.625-45.2-52.06-48.319-55.024-2.917-2.772-8.674 18.248-13 18.248Zm-9.501-6.935a4.062 4.062 0 1 0 0 8.124 4.062 4.062 0 0 0 0-8.124ZM82.376 70.978a4.744 4.744 0 0 0-4.332 2.814l-3.007 6.771c-.655 1.472-2.283 4.294-1.405 5.644C74.51 87.559 114.63 127 116.24 127l20.259-9.5c1.61 0-14.773-31.078-13.896-32.429a4.718 4.718 0 0 0 .357-4.507l-3.007-6.77a4.744 4.744 0 0 0-4.332-2.815H93c-.863 1.307 16.414 2.66 15.404 4.063h7.218c.267 0 .51.157.619.402l3.007 6.77a.66.66 0 0 1-.05.646c-.076.115-.247-9.36-.566-9.36H79.366c-.32 0-.494 9.472-.569 9.357a.661.661 0 0 1-.05-.642l3.01-6.771a.68.68 0 0 1 .619-.402H108.5c-1.012-1.403-14.639-2.756-15.5-4.063H82.376Z'
        fill='url(#edit_svg__d)'
      />
    </g>
    <path
      d='M145.499 99.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      fill='url(#edit_svg__e)'
    />
    <path
      d='M86.499 24.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      fill='url(#edit_svg__f)'
    />
    <path
      d='M62.499 75.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      fill='url(#edit_svg__g)'
    />
    <path
      d='M115.706 35.784c-2.505 0-5.011.921-6.909 2.764L77.896 68.519a4.71 4.71 0 0 0-1.244 2.053L72.51 84.64a1.972 1.972 0 0 0-.012 1.067c.093.35.282.67.546.925.264.256.593.44.954.53.362.091.741.087 1.1-.012l14.506-4.018.003-.002a4.929 4.929 0 0 0 2.11-1.204l30.899-29.974a9.309 9.309 0 0 0 0-13.404c-1.899-1.843-4.404-2.764-6.91-2.764Z'
      fill='#F0F4FF'
    />
    <path
      d='M115.25 35.784c-2.43 0-4.86.921-6.702 2.764L78.574 68.519a4.739 4.739 0 0 0-1.206 2.053L73.35 84.64a2.03 2.03 0 0 0 2.51 2.51l14.07-4.018a4.747 4.747 0 0 0 2.05-1.206l29.972-29.974c3.685-3.685 3.685-9.72 0-13.404a9.448 9.448 0 0 0-6.702-2.764Zm0 4.039c1.382 0 2.763.532 3.827 1.597h.003a5.386 5.386 0 0 1 0 7.66l-2.627 2.626-7.659-7.66 2.626-2.626a5.4 5.4 0 0 1 3.83-1.597Zm-9.328 7.096 7.659 7.66-24.475 24.475a.685.685 0 0 1-.294.172L78.259 82.24l3.015-10.556v-.002a.661.661 0 0 1 .172-.291l24.476-24.473Z'
      fill='#2C8658'
    />
    <defs>
      <linearGradient id='edit_svg__a' x1={127.7} y1={99.934} x2={82.492} y2={-0.629} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='edit_svg__b' x1={127.7} y1={99.934} x2={82.492} y2={-0.629} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='edit_svg__d' x1={74.21} y1={37.321} x2={140.326} y2={93.421} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='edit_svg__e' x1={135.5} y1={92} x2={145.5} y2={107} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='edit_svg__f' x1={76.5} y1={17} x2={86.5} y2={32} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='edit_svg__g' x1={52.5} y1={68} x2={62.5} y2={83} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgEdit;
