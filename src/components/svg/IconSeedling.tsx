import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgIconSeedling = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M6.703 2.003a4.868 4.868 0 0 0-.394.032 5.431 5.431 0 0 0-1.562.443C2.718 3.389 1 5.613 1 8.8a.75.75 0 0 0 1.175.618c.56-.385 1.2-.325 2.033-.093.833.233 1.704.675 2.686.675a4.304 4.304 0 0 0 3.16-1.379.75.75 0 1 0-1.108-1.01c-.5.547-1.32.889-2.052.889-.421 0-1.303-.346-2.283-.62-.593-.165-1.28-.263-1.967-.172.326-1.991 1.446-3.29 2.718-3.862.75-.337 1.531-.422 2.179-.278.176.04.316.134.472.204-1.801.354-2.832 1.49-2.832 1.49a.75.75 0 1 0 1.138.976s1.147-1.436 3.547-1a.745.745 0 0 0 .041.006s.217.003.563.349c.345.345.78 1.05.78 2.657V12h-6a.75.75 0 1 0 0 1.5h.33l.727 6.554A2.76 2.76 0 0 0 9.04 22.5h5.92a2.76 2.76 0 0 0 2.734-2.446l.727-6.554h.329a.751.751 0 1 0 0-1.5h-6V8.25c0-1.607.435-2.312.78-2.657.345-.345.561-.349.562-.349a.746.746 0 0 0 .042-.006c2.4-.436 3.547 1 3.547 1a.75.75 0 1 0 1.138-.976s-1.03-1.136-2.832-1.49c.156-.07.296-.164.472-.204.648-.144 1.429-.06 2.179.278 1.272.571 2.392 1.87 2.718 3.862-.688-.091-1.373.007-1.967.173-.98.273-1.862.619-2.283.619-.732 0-1.553-.342-2.052-.89a.75.75 0 1 0-1.108 1.011A4.304 4.304 0 0 0 17.106 10c.982 0 1.853-.442 2.686-.675.833-.232 1.473-.292 2.033.093A.75.75 0 0 0 23 8.8c0-3.187-1.718-5.411-3.747-6.322-1.014-.456-2.11-.599-3.12-.374-.945.211-1.789.8-2.349 1.677a.751.751 0 0 0-.132.051l-.002.001c-.26.07-.703.222-1.18.7-.18.179-.314.503-.47.765-.156-.262-.29-.586-.47-.766-.479-.479-.924-.63-1.183-.7a.753.753 0 0 0-.131-.05c-.56-.878-1.404-1.467-2.349-1.678a4.511 4.511 0 0 0-1.164-.101ZM7.088 13.5h4.789c.08.013.163.013.243 0h4.792l-.709 6.388A1.242 1.242 0 0 1 14.961 21H9.04a1.24 1.24 0 0 1-1.242-1.111v-.001l-.71-6.388Z' />
  </svg>
);

export default SvgIconSeedling;