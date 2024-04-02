import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconOrganization = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-organization_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-organization_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-organization_svg__c)'
        d='M108.999 106.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-organization_svg__d)'
        d='M142.999 19.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <path
        fill='url(#blobby-icon-organization_svg__e)'
        d='M66.999 42.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      />
      <mask
        id='blobby-icon-organization_svg__g'
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
          fill='url(#blobby-icon-organization_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-organization_svg__g)'>
        <path
          fill='url(#blobby-icon-organization_svg__h)'
          d='m153.619 78.772-40.718-40.718-38.909 40.087 37.877 37.877 41.75-37.246Z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M75.892 37.477a2 2 0 0 1 .775-.144h34.666a2 2 0 1 1 0 4h-.666v8h9.679c.215-.035.434-.035.649 0h2.338a2 2 0 1 1 0 4h-.666V69.47c2.231.34 4 2.213 4 4.531v14.667a2 2 0 0 1-2 2H87.333a2 2 0 0 1-2-2v-10h-10a2 2 0 0 1-2-2V62a4.675 4.675 0 0 1 4-4.62V41.333h-.666a2 2 0 0 1-.775-3.856Z'
      />
      <path
        fill='#2C8658'
        d='M76.667 37.333a2 2 0 1 0 0 4h.666V57.38a4.675 4.675 0 0 0-4 4.62v14.667a2 2 0 0 0 2 2h7.334v-4h-5.334V62c0-.367.3-.667.667-.667h1.333a2 2 0 0 0 2-2v-18h25.334v5.334h4v-5.334h.666a2 2 0 1 0 0-4H76.667Zm14.635 11.972a2.004 2.004 0 0 0-.29.028h-2.345a2 2 0 1 0 0 4h.666V69.47c-2.231.34-4 2.213-4 4.531v14.667a2 2 0 0 0 2 2h37.334a2 2 0 0 0 2-2V74c0-2.318-1.769-4.19-4-4.531V53.333h.666a2 2 0 1 0 0-4h-2.338a2.008 2.008 0 0 0-.649 0H91.661a2.004 2.004 0 0 0-.359-.028Zm2.031 4.028h25.334v18a2 2 0 0 0 2 2H122c.393 0 .667.274.667.667v12.667h-13.334v-8c0-.736-.597-1.334-1.333-1.334h-4c-.736 0-1.333.598-1.333 1.334v8H89.333V74c0-.393.273-.667.667-.667h1.333a2 2 0 0 0 2-2v-18ZM100 58.667c-.736 0-1.333.597-1.333 1.333v2.667c0 .736.597 1.333 1.333 1.333h2.667c.736 0 1.333-.597 1.333-1.333V60c0-.736-.597-1.333-1.333-1.333H100Zm9.333 0c-.736 0-1.333.597-1.333 1.333v2.667c0 .736.597 1.333 1.333 1.333H112c.736 0 1.333-.597 1.333-1.333V60c0-.736-.597-1.333-1.333-1.333h-2.667ZM100 68c-.736 0-1.333.597-1.333 1.333V72c0 .736.597 1.333 1.333 1.333h2.667c.736 0 1.333-.597 1.333-1.333v-2.667c0-.736-.597-1.333-1.333-1.333H100Zm9.333 0c-.736 0-1.333.597-1.333 1.333V72c0 .736.597 1.333 1.333 1.333H112c.736 0 1.333-.597 1.333-1.333v-2.667c0-.736-.597-1.333-1.333-1.333h-2.667Zm-14.666 9.333c-.736 0-1.334.598-1.334 1.334v2.666c0 .736.598 1.334 1.334 1.334h2.666c.736 0 1.334-.598 1.334-1.334v-2.666c0-.736-.598-1.334-1.334-1.334h-2.666Zm20 0c-.736 0-1.334.598-1.334 1.334v2.666c0 .736.598 1.334 1.334 1.334h2.666c.736 0 1.334-.598 1.334-1.334v-2.666c0-.736-.598-1.334-1.334-1.334h-2.666Z'
      />
    </g>
    <defs>
      <linearGradient
        id='blobby-icon-organization_svg__b'
        x1={126.5}
        x2={50}
        y1={104}
        y2={27.5}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-organization_svg__c'
        x1={99}
        x2={109}
        y1={99}
        y2={114}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-organization_svg__d'
        x1={133}
        x2={143}
        y1={12}
        y2={27}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-organization_svg__e'
        x1={57}
        x2={67}
        y1={35}
        y2={50}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-organization_svg__f'
        x1={126.5}
        x2={50}
        y1={104}
        y2={27.5}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-organization_svg__h'
        x1={90.5}
        x2={133.322}
        y1={58.575}
        y2={99.564}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-organization_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconOrganization;
