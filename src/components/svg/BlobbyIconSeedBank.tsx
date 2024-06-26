import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyIconSeedBank = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-icon-seed-bank_svg__a)'>
      <path
        fill='#E2F6EC'
        fillRule='evenodd'
        d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.256 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-seed-bank_svg__b)'
        fillOpacity={0.2}
        fillRule='evenodd'
        d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.256 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663'
        clipRule='evenodd'
      />
      <path
        fill='url(#blobby-icon-seed-bank_svg__c)'
        d='M56.999 34.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-seed-bank_svg__d)'
        d='M152.999 63.449h-.019c-2.75 0-4.982-3.33-5-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <path
        fill='url(#blobby-icon-seed-bank_svg__e)'
        d='M84.999 92.449h-.02c-2.75 0-4.98-3.33-4.999-7.449-.018 4.11-2.239 7.434-4.98 7.449 2.741.015 4.962 3.34 4.98 7.449.018-4.119 2.25-7.449 5-7.449z'
      />
      <mask
        id='blobby-icon-seed-bank_svg__g'
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
          d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.256 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663'
          clipRule='evenodd'
        />
        <path
          fill='url(#blobby-icon-seed-bank_svg__f)'
          fillOpacity={0.2}
          fillRule='evenodd'
          d='M96.821 12.057c24.878-.65 53.949 4 61.596 27.683 7.623 23.607-13.691 43.746-33.873 58.171-19.515 13.948-44.256 25.396-64.012 11.791-20.912-14.4-24.98-43.182-16.134-66.982 7.796-20.98 30.05-30.078 52.423-30.663'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#blobby-icon-seed-bank_svg__g)'>
        <path
          fill='url(#blobby-icon-seed-bank_svg__h)'
          d='m152.2 77.2-28.7-28.7-41.86 37.641L107.5 112z'
          opacity={0.25}
        />
      </g>
      <path
        fill='#EAF3DC'
        d='M77.943 46.995c2.902-4.551 7.16-7.662 12.057-7.662 3.665 0 6.563.982 8.758 2.776 2.004 1.64 3.382 3.828 4.664 6.3 2.777-1.722 5.726-2.906 8.596-3.357 3.55-.557 6.976-.008 9.8 1.98 4.013 2.824 5.648 7.833 5.362 13.205-.287 5.372-2.42 11.293-6.219 16.69-3.81 5.41-8.742 9.37-13.768 11.401-4.446 1.796-9.106 2.079-12.901.167q-.133.07-.274.122a11.7 11.7 0 0 1-4.018.716c-4.898 0-9.155-3.11-12.057-7.661s-4.61-10.643-4.61-17.339 1.707-12.787 4.61-17.338'
      />
      <path
        fill='#2C8658'
        d='M90 39.333c-4.898 0-9.155 3.11-12.057 7.662-2.903 4.55-4.61 10.642-4.61 17.338s1.707 12.788 4.61 17.339c2.902 4.55 7.16 7.661 12.057 7.661 1.385 0 2.74-.25 4.018-.716q.141-.051.274-.122c3.794 1.912 8.455 1.629 12.901-.167 5.026-2.03 9.958-5.99 13.768-11.4 3.799-5.398 5.932-11.32 6.219-16.691.286-5.372-1.349-10.38-5.362-13.206-2.824-1.987-6.25-2.536-9.8-1.979-2.87.45-5.819 1.635-8.596 3.357-1.282-2.472-2.66-4.66-4.664-6.3-2.195-1.794-5.093-2.776-8.758-2.776m0 4c3.002 0 4.76.673 6.227 1.873 1.444 1.18 2.646 3.048 3.921 5.575a35.4 35.4 0 0 0-6.442 6.959c-.558.791-.815 1.64-1.3 2.45-.697-3.132.591-5.08.591-5.08a2 2 0 1 0-3.328-2.22s-3.209 5.168-.125 11.337a2 2 0 0 0 .42.575c-1.362 3.26-2.312 6.526-2.477 9.628-.22 4.107.69 7.998 2.922 10.867-.137.007-.27.036-.41.036-3.202 0-6.278-2.039-8.684-5.812s-3.982-9.181-3.982-15.188c0-6.006 1.576-11.414 3.982-15.187s5.482-5.813 8.685-5.813m24.958 5.57q.715.025 1.386.139c1.189.203 2.264.621 3.172 1.26 2.61 1.838 3.907 5.263 3.669 9.721s-2.089 9.763-5.495 14.602c-3.397 4.825-7.815 8.306-11.995 9.995-4.179 1.688-7.933 1.582-10.544-.255-2.61-1.838-3.907-5.264-3.67-9.722.239-4.458 2.09-9.762 5.496-14.601 2.039-2.897 4.411-5.297 6.874-7.11 3.773-2.774 7.775-4.14 11.107-4.028m.344 3.068a2 2 0 0 0-1.93 2.422s.566 3.05 0 5.88c-.283 1.416-.83 2.69-1.703 3.563s-2.086 1.497-4.336 1.497c-3.386 0-5.99.989-7.721 2.633s-2.495 3.783-2.784 5.742c-.577 3.918.594 7.542.594 7.542a2 2 0 0 0 2.52 1.409 2 2 0 0 0 1.2-1.01 2 2 0 0 0 .103-1.566s-.866-3.043-.461-5.791c.202-1.375.682-2.57 1.583-3.425s2.316-1.534 4.966-1.534c3.084 0 5.537-1.042 7.164-2.669s2.414-3.686 2.797-5.604c.767-3.836 0-7.453 0-7.453a2 2 0 0 0-1.992-1.636'
      />
    </g>
    <defs>
      <linearGradient
        id='blobby-icon-seed-bank_svg__b'
        x1={125.5}
        x2={50}
        y1={101.5}
        y2={26}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient id='blobby-icon-seed-bank_svg__c' x1={47} x2={57} y1={27} y2={42} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-seed-bank_svg__d'
        x1={143}
        x2={153}
        y1={56}
        y2={71}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient id='blobby-icon-seed-bank_svg__e' x1={75} x2={85} y1={85} y2={100} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-seed-bank_svg__f'
        x1={125.5}
        x2={50}
        y1={101.5}
        y2={26}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F1F0EC' />
        <stop offset={1} stopColor='#84D6AC' />
      </linearGradient>
      <linearGradient
        id='blobby-icon-seed-bank_svg__h'
        x1={100}
        x2={128.018}
        y1={67.84}
        y2={99.59}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2C8658' />
        <stop offset={1} stopColor='#ACD278' />
      </linearGradient>
      <clipPath id='blobby-icon-seed-bank_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyIconSeedBank;
