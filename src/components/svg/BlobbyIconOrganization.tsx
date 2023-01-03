import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconOrganization = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 200 128' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
      fill='#F0F4FF'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
      fill='url(#blobby-icon-organization_svg__a)'
      fillOpacity={0.2}
    />
    <mask
      id='blobby-icon-organization_svg__c'
      style={{
        maskType: 'alpha',
      }}
      maskUnits='userSpaceOnUse'
      x={45}
      y={4}
      width={111}
      height={120}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
        fill='#F0F4FF'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M96.667 4.039c26.67-1.026 50.485 18.385 57.399 44.164 6.047 22.546-11.922 41.533-30.693 55.408-19.462 14.387-44.342 28.69-64.028 14.611-19.947-14.266-15.548-42.761-7.93-66.071 7.563-23.136 20.93-47.177 45.252-48.112Z'
        fill='url(#blobby-icon-organization_svg__b)'
        fillOpacity={0.2}
      />
    </mask>
    <g mask='url(#blobby-icon-organization_svg__c)'>
      <path
        opacity={0.25}
        d='M75.802 38.416a2.031 2.031 0 1 0 0 4.063h.677v16.297a4.748 4.748 0 0 0-4.062 4.692v14.896c0 .555.222 1.058.583 1.424.369.375 13.718 13.712 13.718 13.712l-2.114-13.105v-4.062H94.5V63.468c0-.372-17.716-.677-17.344-.677l4.74 2.264c1.121 0 2.031-.91 2.031-2.03L80.542 70h25.729V50.604h4.062l11.603 3.477h.677a2.036 2.036 0 0 0 1.455-.584 2.028 2.028 0 0 0 .606-1.447c0-.269.103-.56 0-.808-.104-.248-12.017-12.052-12.209-12.241a2.03 2.03 0 0 0-1.454-.585H75.802Zm14.864 12.159a2.035 2.035 0 0 0-.293.029H87.99a2.031 2.031 0 1 0 0 4.062h.677v16.388c-2.267.346-4.063 2.248-4.063 4.602v14.896c0 .538.214 1.055.595 1.436l35.301 35.147 37.469 2.032a2.03 2.03 0 0 0 2.031-2.032V112.24c0-2.355-1.796-4.256-4.062-4.602l-7.401-26.992h.677a2.031 2.031 0 0 0 1.903-2.815c-.104-.248-.448-.663-.448-.663s-25.746-25.825-25.995-25.926c-.25-.1-1.207-.642-1.476-.638h-2.375a2.035 2.035 0 0 0-.659 0H91.031c-.12-.02-.242-.03-.365-.03Zm8.834 9.508c-.747 0-1.354.607-1.354 1.354v2.708c0 .748.607 1.355 1.354 1.355h2.708c.748 0 1.355-.607 1.355-1.355v-2.708c0-.747-.607-1.354-1.355-1.354H99.5Zm9.479 0c-.747 0-1.354.607-1.354 1.354v2.708c0 .748.607 1.355 1.354 1.355h2.709c.747 0 1.354-.607 1.354-1.355v-2.708c0-.747-.607-1.354-1.354-1.354h-2.709Zm-9.479 9.48c-.747 0-1.354.606-1.354 1.353v2.709c0 .747.607 1.354 1.354 1.354h2.708c.748 0 1.355-.607 1.355-1.354v-2.709c0-.747-.607-1.354-1.355-1.354H99.5Zm9.479 0c-.747 0-1.354.606-1.354 1.353v2.709c0 .747.607 1.354 1.354 1.354h2.709c.747 0 34.77 35.977 34.77 35.229V107.5c0-.748-34.023-37.938-34.77-37.938h-2.709ZM94.083 79.04c-.747 0-1.354.607-1.354 1.354v2.709c0 .747.607 1.354 1.354 1.354h2.709c.747 0 1.354-.607 1.354-1.354v-2.709c0-.747-.607-1.354-1.354-1.354h-2.709Zm53.73 36.584c-.748 0-1.355.607-1.355 1.354v2.709c0 .747.607 1.354 1.355 1.354h2.708c.747 0 1.354-.607 1.354-1.354v-2.709c0-.747-.607-1.354-1.354-1.354h-2.708Z'
        fill='url(#blobby-icon-organization_svg__d)'
      />
    </g>
    <path
      d='M105.999 116.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.109-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      fill='url(#blobby-icon-organization_svg__e)'
    />
    <path
      d='M139.999 29.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      fill='url(#blobby-icon-organization_svg__f)'
    />
    <path
      d='M63.999 52.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449h.019Z'
      fill='url(#blobby-icon-organization_svg__g)'
    />
    <path
      d='M75.802 38.416a2.031 2.031 0 1 0 0 4.063h.677v16.297a4.748 4.748 0 0 0-4.062 4.692v14.896c0 1.121.91 2.031 2.031 2.031h10.156v-4.062H94.5V63.468c0-.372-17.716-.677-17.344-.677l4.74 2.264c1.121 0 2.031-.91 2.031-2.03L80.542 70h25.729V50.604h4.062v-8.125h.678a2.031 2.031 0 1 0 0-4.063H75.802Zm14.864 12.159a2.035 2.035 0 0 0-.293.029H87.99a2.031 2.031 0 1 0 0 4.062h.677v16.388c-2.267.346-4.063 2.248-4.063 4.602v14.896a2.032 2.032 0 0 0 2.031 2.03h37.917a2.03 2.03 0 0 0 2.031-2.03V75.656c0-2.354-1.796-4.256-4.062-4.602V54.666h.677a2.031 2.031 0 1 0 0-4.062h-2.375a2.035 2.035 0 0 0-.659 0H91.031c-.12-.02-.242-.03-.365-.03Zm8.834 9.508c-.747 0-1.354.607-1.354 1.354v2.708c0 .748.607 1.355 1.354 1.355h2.708c.748 0 1.355-.607 1.355-1.355v-2.708c0-.747-.607-1.354-1.355-1.354H99.5Zm9.479 0c-.747 0-1.354.607-1.354 1.354v2.708c0 .748.607 1.355 1.354 1.355h2.709c.747 0 1.354-.607 1.354-1.355v-2.708c0-.747-.607-1.354-1.354-1.354h-2.709Zm-9.479 9.48c-.747 0-1.354.606-1.354 1.353v2.709c0 .747.607 1.354 1.354 1.354h2.708c.748 0 1.355-.607 1.355-1.354v-2.709c0-.747-.607-1.354-1.355-1.354H99.5Zm9.479 0c-.747 0-1.354.606-1.354 1.353v2.709c0 .747.607 1.354 1.354 1.354h2.709c.747 0 1.354-.607 1.354-1.354v-2.709c0-.747-.607-1.354-1.354-1.354h-2.709ZM94.083 79.04c-.747 0-1.354.607-1.354 1.354v2.709c0 .747.607 1.354 1.354 1.354h2.709c.747 0 1.354-.607 1.354-1.354v-2.709c0-.747-.607-1.354-1.354-1.354h-2.709Zm20.313 0c-.748 0-1.354.607-1.354 1.354v2.709c0 .747.606 1.354 1.354 1.354h2.708c.748 0 1.354-.607 1.354-1.354v-2.709c0-.747-.606-1.354-1.354-1.354h-2.708Z'
      fill='#F0F4FF'
    />
    <path
      d='M75.802 38.417a2.03 2.03 0 1 0 0 4.062h.677v16.298a4.748 4.748 0 0 0-4.062 4.692v14.896c0 1.12.91 2.03 2.03 2.03h7.449v-4.062h-5.417V63.47a.68.68 0 0 1 .677-.677h1.354c1.122 0 2.032-.91 2.032-2.032V42.48h25.729v5.416h4.062v-5.417h.677a2.033 2.033 0 0 0 1.903-2.815 2.03 2.03 0 0 0-1.903-1.247H75.802Zm14.864 12.158a2.035 2.035 0 0 0-.293.03H87.99a2.03 2.03 0 1 0 0 4.062h.677v16.387c-2.267.346-4.063 2.248-4.063 4.602v14.896a2.032 2.032 0 0 0 2.031 2.031h37.917a2.03 2.03 0 0 0 2.031-2.03V75.655c0-2.354-1.796-4.256-4.062-4.602V54.667h.677a2.031 2.031 0 1 0 0-4.063h-2.375a2.035 2.035 0 0 0-.659 0H91.031c-.12-.02-.243-.03-.365-.029Zm2.063 4.092h25.729v18.281a2.03 2.03 0 0 0 2.032 2.031h1.354c.399 0 .677.278.677.677v12.865h-13.542v-8.125c0-.748-.607-1.354-1.354-1.354h-4.063c-.747 0-1.354.606-1.354 1.354v8.125H88.667V75.656c0-.4.277-.677.677-.677h1.354a2.032 2.032 0 0 0 2.031-2.031V54.667Zm6.771 5.416c-.748 0-1.354.607-1.354 1.355v2.708c0 .747.606 1.354 1.354 1.354h2.708c.748 0 1.354-.607 1.354-1.354v-2.709c0-.747-.606-1.354-1.354-1.354H99.5Zm9.479 0c-.747 0-1.354.607-1.354 1.355v2.708c0 .747.607 1.354 1.354 1.354h2.708c.748 0 1.355-.607 1.355-1.354v-2.709c0-.747-.607-1.354-1.355-1.354h-2.708Zm-9.479 9.48c-.748 0-1.354.606-1.354 1.354v2.708c0 .748.606 1.354 1.354 1.354h2.708c.748 0 1.354-.606 1.354-1.354v-2.708c0-.748-.606-1.355-1.354-1.355H99.5Zm9.479 0c-.747 0-1.354.606-1.354 1.354v2.708c0 .748.607 1.354 1.354 1.354h2.708c.748 0 1.355-.606 1.355-1.354v-2.708c0-.748-.607-1.355-1.355-1.355h-2.708Zm-14.896 9.479c-.747 0-1.354.606-1.354 1.354v2.708c0 .748.607 1.354 1.354 1.354h2.709c.747 0 1.354-.606 1.354-1.354v-2.708c0-.748-.607-1.354-1.354-1.354h-2.709Zm20.313 0c-.748 0-1.354.606-1.354 1.354v2.708c0 .748.606 1.354 1.354 1.354h2.708c.748 0 1.354-.606 1.354-1.354v-2.708c0-.748-.606-1.354-1.354-1.354h-2.708Z'
      fill='#2C8658'
    />
    <defs>
      <linearGradient id='blobby-icon-organization_svg__a' x1={126.5} y1={104} x2={75.5} y2={4} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-organization_svg__b' x1={126.5} y1={104} x2={75.5} y2={4} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#007DF2' />
        <stop offset={1} stopColor='#53EA9F' />
      </linearGradient>
      <linearGradient id='blobby-icon-organization_svg__d' x1={72.34} y1={38.45} x2={83.724} y2={48.869} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-organization_svg__e' x1={96} y1={109} x2={106} y2={124} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-organization_svg__f' x1={130} y1={22} x2={140} y2={37} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
      <linearGradient id='blobby-icon-organization_svg__g' x1={54} y1={45} x2={64} y2={60} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#308F5F' />
        <stop offset={1} stopColor='#007DF2' />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgBlobbyIconOrganization;
