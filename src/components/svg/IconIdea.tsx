import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconIdea = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill='#333025'
      d='M12 2.008C8.145 2.008 5 5.143 5 9c0 2 .846 3.81 2.194 5.084.159.15.275.36.33.603l1.233 5.551A2.26 2.26 0 0 0 10.953 22h2.094c1.05 0 1.968-.736 2.196-1.762l1.234-5.551v-.002c.054-.24.17-.45.329-.6v-.001A6.98 6.98 0 0 0 19 9c0-3.857-3.145-6.991-7-6.992m0 1.5c3.047 0 5.5 2.447 5.5 5.492a5.47 5.47 0 0 1-1.725 3.994c-.398.376-.65.86-.762 1.367L14.427 17H9.573l-.586-2.64a2.67 2.67 0 0 0-.762-1.366A5.47 5.47 0 0 1 6.5 9 5.483 5.483 0 0 1 12 3.508M9.907 18.5h4.186l-.314 1.413a.744.744 0 0 1-.732.587h-2.094a.74.74 0 0 1-.732-.587z'
    />
  </svg>
);
export default SvgIconIdea;
