import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconGraphReport = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-graph-report_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-graph-report_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-graph-report_svg__c)'
        d='M108.999 106.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-graph-report_svg__d)'
        d='M142.999 19.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-graph-report_svg__e)'
        d='M66.999 42.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <mask
        id='blobby-icon-graph-report_svg__g'
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
          fill='url(#blobby-icon-graph-report_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-graph-report_svg__g)'>
        <path fill='url(#blobby-icon-graph-report_svg__h)' d='m158 92.5-38-38-39.61 34.371 38.543 38.542L158 92.5Z' opacity={0.25} />
      </g>
      <path
        fill='#EAF3DC'
        d='M84.667 37.333a6.01 6.01 0 0 0-6 6v41.334c0 3.306 2.693 6 6 6h30.666c3.308 0 6-2.692 6-6v-28c0-.554-.224-1.053-.586-1.414l-17.333-17.334a1.993 1.993 0 0 0-1.414-.586H84.667Z'
      />
      <path
        fill='#2C8658'
        d='M84.667 37.333a6.01 6.01 0 0 0-6 6v41.334c0 3.306 2.693 6 6 6h30.666c3.308 0 6-2.692 6-6v-28c0-.554-.224-1.053-.586-1.414l-17.333-17.334a1.993 1.993 0 0 0-1.414-.586H84.667Zm0 4H100v11.334c0 3.306 2.693 6 6 6h11.333v26c0 1.102-.897 2-2 2H84.667c-1.107 0-2-.894-2-2V43.333c0-1.106.893-2 2-2ZM104 44.161l10.505 10.506H106c-1.107 0-2-.894-2-2V44.16Zm6.667 21.172a2.664 2.664 0 0 0-2.659 2.498l-5.341 5.34-4.008-4.007A2.667 2.667 0 0 0 96 66.667a2.667 2.667 0 0 0-2.659 2.497l-4.177 4.177a2.666 2.666 0 0 0 .17 5.326 2.667 2.667 0 0 0 2.658-2.498L96 72.162l4.008 4.007a2.666 2.666 0 0 0 2.659 2.498 2.667 2.667 0 0 0 2.659-2.498l5.51-5.51a2.667 2.667 0 0 0-.169-5.326Z'
      />
    </g>
    <defs>
      <linearGradient id='blobby-icon-graph-report_svg__b' x1={126.5} x2={50} y1={104} y2={27.5} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-graph-report_svg__c' x1={99} x2={109} y1={99} y2={114} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-graph-report_svg__d' x1={133} x2={143} y1={12} y2={27} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-graph-report_svg__e' x1={57} x2={67} y1={35} y2={50} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-graph-report_svg__f' x1={126.5} x2={50} y1={104} y2={27.5} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-graph-report_svg__h' x1={93.831} x2={135.329} y1={72.5} y2={116.904} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-graph-report_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconGraphReport;
