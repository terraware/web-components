import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWelcomeClipboard = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 136 118' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g filter='url(#welcome-clipboard_svg__a)'>
      <rect
        width={97}
        height={79}
        x={102.152}
        y={8.5}
        fill='#E3E1D9'
        stroke='#7F775B'
        rx={3.5}
        transform='rotate(90 102.152 8.5)'
      />
      <rect width={87} height={74} x={99.652} y={12} fill='#fff' rx={2} transform='rotate(90 99.652 12)' />
      <path
        fill='#9A9172'
        stroke='#7F775B'
        d='M56.714 4.5h.369l.109-.352c.303-.979 1.136-1.89 2.382-2.564C60.814.913 62.424.5 64.198.5s3.383.413 4.624 1.084c1.245.674 2.078 1.585 2.382 2.564l.109.352h8.339a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-32a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5z'
      />
      <path
        fill='#E3E1D9'
        d='M39.326 90.738c0-.55.446-.996.996-.996H51.61a.996.996 0 0 1 0 1.992H40.322a.996.996 0 0 1-.996-.996M39.326 85.095c0-1.1.892-1.992 1.992-1.992h36.187a1.992 1.992 0 0 1 0 3.983H41.318c-1.1 0-1.992-.891-1.992-1.992M39.326 75.469c0-.55.446-.996.996-.996h8.632a.996.996 0 0 1 0 1.992h-8.632a.996.996 0 0 1-.996-.996M39.326 69.825c0-1.1.892-1.992 1.992-1.992h17.264a1.992 1.992 0 1 1 0 3.984H41.317c-1.1 0-1.992-.891-1.992-1.992M39.293 60.197c0-.55.446-.996.996-.996h7.653a.996.996 0 0 1 0 1.992H40.29a.996.996 0 0 1-.996-.996M38.967 54.282c0-1.05.85-1.9 1.899-1.9H89.48a1.899 1.899 0 1 1 0 3.799H40.866a1.9 1.9 0 0 1-1.9-1.9M39.326 44.929c0-.55.446-.996.996-.996h14.94a.996.996 0 1 1 0 1.992h-14.94a.996.996 0 0 1-.996-.996M39.326 39.284c0-1.1.892-1.992 1.992-1.992h38.51a1.992 1.992 0 1 1 0 3.984h-38.51c-1.1 0-1.992-.892-1.992-1.992M39.324 29.654c0-.55.446-.996.996-.996h11.288a.996.996 0 1 1 0 1.992H40.32a.996.996 0 0 1-.996-.996M38.969 23.899c0-1.049.85-1.899 1.899-1.899h43.296a1.899 1.899 0 1 1 0 3.798H40.868a1.9 1.9 0 0 1-1.9-1.899'
      />
      <circle cx={35.172} cy={24.279} r={1.519} fill='#E3E1D9' />
      <circle cx={35.172} cy={39.471} r={1.519} fill='#E3E1D9' />
      <circle cx={35.172} cy={69.854} r={1.519} fill='#E3E1D9' />
      <circle cx={35.172} cy={85.046} r={1.519} fill='#E3E1D9' />
      <circle cx={35.172} cy={54.663} r={1.519} fill='#E3E1D9' />
      <path
        fill='#E7F2D5'
        d='M85.603 47.984s14.652-7.97 26.48-3.452 16.355 19.822 16.355 19.822-14.652 7.97-26.48 3.452-16.355-19.822-16.355-19.822'
      />
      <path
        stroke='#A3D24F'
        strokeLinecap='round'
        strokeMiterlimit={10}
        strokeWidth={2}
        d='M117.478 58.932c-8.467-5.72-16.299-11.015-40.826-12.502'
      />
      <path
        stroke='#A3D24F'
        strokeLinecap='round'
        strokeMiterlimit={10}
        strokeWidth={2}
        d='M85.603 47.984s14.652-7.97 26.48-3.452 16.355 19.822 16.355 19.822-14.652 7.97-26.48 3.452-16.355-19.822-16.355-19.822Z'
      />
      <circle cx={22.783} cy={40} r={15} fill='#fff' stroke='#2C8658' strokeWidth={2} />
      <path stroke='#2C8658' strokeLinecap='round' strokeWidth={2} d='M22.54 31.048V48.47M31.25 39.759H13.827' />
    </g>
    <defs>
      <filter
        id='welcome-clipboard_svg__a'
        width={134.844}
        height={118}
        x={0.783}
        y={0}
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feColorMatrix in='SourceAlpha' result='hardAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' />
        <feOffset dy={6} />
        <feGaussianBlur stdDeviation={3} />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0.1 0' />
        <feBlend in2='BackgroundImageFix' result='effect1_dropShadow_820_17368' />
        <feBlend in='SourceGraphic' in2='effect1_dropShadow_820_17368' result='shape' />
      </filter>
    </defs>
  </svg>
);
export default SvgWelcomeClipboard;
