import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBlobbyGrayIconImage = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 128' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath='url(#blobby-gray-icon-image_svg__a)'>
      <path
        fill='#F1F0EC'
        fillRule='evenodd'
        d='M113.962 6.222c26.535 2.074 38.447 30.862 44.693 56.735 4.621 19.146-2.901 38.537-18.932 49.978-15.595 11.131-35.55 10.486-51.986.639C63.732 99.19 34.311 80.943 40.954 53.757c7.619-31.19 41-50.037 73.009-47.535'
        clipRule='evenodd'
      />
      <path
        fill='#7F775B'
        d='M83.333 40C79.307 40 76 43.307 76 47.333v33.334C76 84.693 79.307 88 83.333 88h33.334c4.026 0 7.333-3.307 7.333-7.333V47.333c0-4.026-3.307-7.333-7.333-7.333zm0 4h33.334A3.304 3.304 0 0 1 120 47.333v27.274l-8.016-7.755-.002-.003a5.4 5.4 0 0 0-3.75-1.516 5.4 5.4 0 0 0-3.75 1.519l-2.732 2.643-8.24-7.972A5.4 5.4 0 0 0 89.758 60a5.4 5.4 0 0 0-3.75 1.52l-.003.003L80 67.333v-20A3.304 3.304 0 0 1 83.333 44m25.334 5.333c-1.834 0-3.462.76-4.495 1.922-1.033 1.163-1.505 2.634-1.505 4.078s.472 2.916 1.505 4.078 2.661 1.922 4.495 1.922c1.833 0 3.461-.76 4.494-1.922 1.034-1.162 1.506-2.633 1.506-4.078 0-1.444-.472-2.915-1.506-4.078-1.033-1.162-2.661-1.922-4.494-1.922m0 4c.833 0 1.205.24 1.505.578s.495.867.495 1.422c0 .556-.195 1.085-.495 1.422-.3.338-.672.578-1.505.578-.834 0-1.205-.24-1.506-.578s-.494-.866-.494-1.422.194-1.084.494-1.422c.301-.337.672-.578 1.506-.578M89.757 64a1.37 1.37 0 0 1 .972.398l8.143 7.878L86.752 84h-3.419A3.304 3.304 0 0 1 80 80.667v-7.769l8.787-8.5c.283-.274.626-.398.97-.398m18.475 5.333c.353 0 .691.123.971.394L120 80.172v.495A3.304 3.304 0 0 1 116.667 84h-24.16l14.756-14.273c.277-.268.618-.394.969-.394'
      />
    </g>
    <defs>
      <clipPath id='blobby-gray-icon-image_svg__a'>
        <path fill='#fff' d='M0 0h200v128H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBlobbyGrayIconImage;
