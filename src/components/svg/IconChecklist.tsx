import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconChecklist = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d='M6.833 1.333c-.765 0-1.398.59-1.483 1.334H4.167c-.823 0-1.5.677-1.5 1.5v9c0 .822.677 1.5 1.5 1.5h7.666c.823 0 1.5-.678 1.5-1.5v-9c0-.823-.677-1.5-1.5-1.5H10.65a1.504 1.504 0 0 0-1.483-1.334zm0 1h2.334c.282 0 .5.218.5.5s-.218.5-.5.5H6.833a.49.49 0 0 1-.5-.5c0-.282.218-.5.5-.5M4.167 3.667H5.59c.27.4.728.666 1.243.666h2.334c.515 0 .973-.266 1.243-.666h1.423c.283 0 .5.218.5.5v9c0 .282-.217.5-.5.5H4.167a.493.493 0 0 1-.5-.5v-9c0-.282.218-.5.5-.5m6.657 2.662a.5.5 0 0 0-.344.15l-.98.98-.313-.313a.5.5 0 1 0-.707.708l.667.666a.5.5 0 0 0 .707 0l1.333-1.333a.5.5 0 0 0-.363-.858M5.167 7a.5.5 0 1 0 0 1h2a.5.5 0 1 0 0-1zm5.657 2.162a.5.5 0 0 0-.344.151l-.98.98-.313-.313a.5.5 0 1 0-.707.707l.667.667a.5.5 0 0 0 .707 0l1.333-1.334a.5.5 0 0 0-.363-.858M5.167 10a.5.5 0 1 0 0 1h2a.5.5 0 1 0 0-1z'
    />
  </svg>
);
export default SvgIconChecklist;
