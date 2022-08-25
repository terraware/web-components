import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgLogo = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 137 16' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#logo_svg__a)' fill='#000'>
      <path d='M30.222 11.128A28.13 28.13 0 0 0 19.16 6.979V3.095c0-1.054-.197-1.91-.658-2.37C18.172.262 17.514 0 16.724 0h-2.238v1.383h1.843c.922 0 1.251.658 1.251 1.777v3.622c-.79-.066-1.646-.132-2.436-.132-.658 0-1.251 0-1.91.066V0l-1.646.46v6.388C7.374 7.374 3.425 8.888 0 11.128a34.28 34.28 0 0 1 11.588-3.424v5.201c0 1.054.198 1.91.659 2.37.395.462.988.725 1.778.725h2.304v-1.383h-1.843c-.922 0-1.251-.658-1.251-1.778V7.572c.658-.066 1.25-.066 1.909-.066.437 0 .856.017 1.267.034.395.016.782.032 1.17.032V16l1.645-.46V7.77a32.88 32.88 0 0 1 10.996 3.358ZM53.86 9.942c0-1.25.33-1.975 1.383-1.975l.658-.066V6.387h-1.12c-.855 0-1.514.329-1.974.79-.527.593-.725 1.514-.725 2.7v3.95h1.778V9.942ZM59.983 7.967c-1.053 0-1.382.724-1.382 1.975v3.885h-1.778v-3.95c0-1.186.198-2.107.724-2.7.461-.461 1.12-.79 1.976-.79h1.119V7.9l-.659.066ZM88.626 7.967c-1.054 0-1.383.724-1.383 1.975v3.885h-1.778v-3.95c0-1.186.197-2.107.724-2.7.461-.461 1.12-.79 1.976-.79h1.119V7.9l-.659.066Z' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M47.012 14.025c1.515 0 2.502-.461 3.292-1.58l-1.448-.857c-.46.527-.988.725-1.778.725-1.053 0-1.843-.593-2.04-1.646h5.793v-.395c0-2.24-1.514-3.885-3.819-3.885-2.304 0-3.753 1.843-3.753 3.819 0 2.107 1.449 3.819 3.753 3.819Zm0-6.058c.988 0 1.712.527 1.976 1.383h-3.885c.33-.922.987-1.383 1.91-1.383ZM67.029 13.103c-.659.592-1.317.922-2.239.922-1.844 0-3.424-1.58-3.424-3.82 0-2.238 1.515-3.818 3.424-3.818.856 0 1.646.329 2.239.987v-.79h1.778v7.243h-1.778v-.724Zm-3.82-2.897c0 1.25.791 2.173 1.91 2.173 1.12 0 1.976-.856 1.976-2.173 0-1.251-.856-2.107-1.976-2.107-1.185 0-1.91.987-1.91 2.107ZM80.33 14.025c2.172 0 3.818-1.712 3.818-3.82 0-2.106-1.712-3.752-3.819-3.818-1.975 0-3.753 1.646-3.753 3.819s1.646 3.819 3.753 3.819Zm0-1.712c-1.12 0-1.91-.856-1.91-2.107 0-1.185.79-2.041 1.91-2.107 1.184 0 1.975.856 1.975 2.107 0 1.317-.856 2.107-1.976 2.107ZM108.313 13.103c-.659.592-1.317.922-2.239.922-1.844 0-3.424-1.58-3.424-3.82 0-2.238 1.515-3.818 3.424-3.818.856 0 1.646.329 2.239.987v-.79h1.778v7.243h-1.778v-.724Zm-3.885-2.897c0 1.25.79 2.173 1.909 2.173 1.12 0 1.976-.856 1.976-2.173 0-1.251-.856-2.107-1.976-2.107-1.119 0-1.909.987-1.909 2.107Z'
      />
      <path d='M119.243 5.53a1.18 1.18 0 0 0 1.185-1.184 1.18 1.18 0 0 0-1.185-1.185c-.659 0-1.185.526-1.185 1.119 0 .658.526 1.25 1.185 1.25ZM120.165 6.65h-1.778v7.243h1.778V6.65ZM45.103 1.91H35.029v1.777h4.082v10.14h1.844V3.687h4.148V1.91Z' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M125.169 14.025c2.173 0 3.819-1.712 3.819-3.82 0-2.106-1.712-3.752-3.819-3.818-1.976 0-3.753 1.646-3.753 3.819s1.646 3.819 3.753 3.819Zm0-1.712c-1.12 0-1.91-.856-1.91-2.107 0-1.185.79-2.041 1.91-2.107 1.185 0 1.975.856 1.975 2.107 0 1.317-.856 2.107-1.975 2.107Z'
      />
      <path d='M117.07 8.165v-1.58h-2.041V3.16l-1.778.526V6.65h-1.909v1.58h1.909v3.688c0 1.185.198 2.107.724 2.7.461.46 1.12.79 1.976.79h1.119v-1.58h-.658c-1.054 0-1.383-.725-1.383-1.976V8.165h2.041ZM75.852 2.173v1.514h-.659c-1.185 0-1.382.593-1.382 1.976v.921h2.04v1.58h-2.04v7.046l-1.778.527v-7.44h-1.91v-1.58h1.91V5.662c0-1.251.198-2.107.724-2.7.395-.527 1.12-.79 1.975-.79h1.12ZM96.988 13.827H95.21v-3.49c0-1.382-.263-2.238-1.251-2.238-.922 0-1.58.724-1.58 2.239v3.49H90.6V6.452h1.778v.987a2.949 2.949 0 0 1 2.238-.987c.922 0 1.646.395 2.107 1.317.659-.856 1.317-1.317 2.436-1.317.79 0 1.515.329 1.91.856.461.592.527 1.382.527 2.37v4.148h-1.778v-3.95c0-1.186-.395-1.778-1.251-1.778-.922 0-1.58.724-1.58 2.173v3.555ZM133.926 6.453c-.79 0-1.383.329-2.107.922v-.79h-1.778v7.242h1.778v-3.029l-.002-.271c-.007-.618-.014-1.186.331-1.704.329-.46.724-.724 1.251-.724 1.12 0 1.251.856 1.251 2.304v3.424h1.778V8.955c0-1.58-1.185-2.502-2.502-2.502Z' />
    </g>
    <defs>
      <clipPath id='logo_svg__a'>
        <path fill='#fff' d='M0 0h136.428v16H0z' />
      </clipPath>
    </defs>
  </svg>
);

export default SvgLogo;
