import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPerson = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 2C9.247 2 7 4.247 7 7s2.247 5 5 5c2.752 0 5-2.247 5-5s-2.248-5-5-5Zm0 1.5c1.942 0 3.5 1.558 3.5 3.5s-1.558 3.5-3.5 3.5A3.489 3.489 0 0 1 8.5 7c0-1.942 1.558-3.5 3.5-3.5ZM5.99 14A2 2 0 0 0 4 15.99v.76c0 1.802 1.14 3.196 2.653 4.031C8.167 21.616 10.084 22 12 22c1.916 0 3.833-.384 5.347-1.219 1.29-.712 2.262-1.85 2.534-3.281H20v-1.51c0-1.09-.9-1.99-1.99-1.99H5.989Zm0 1.5h12.02c.28 0 .491.21.491.49V16H18.5v.75c0 1.198-.673 2.054-1.878 2.719C15.417 20.134 13.71 20.5 12 20.5c-1.71 0-3.417-.366-4.622-1.031C6.173 18.804 5.5 17.948 5.5 16.75v-.76c0-.28.21-.49.49-.49Z' />
  </svg>
);
export default SvgPerson;
