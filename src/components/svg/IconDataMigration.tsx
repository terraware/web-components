import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconDataMigration = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M6.25 2C4.74 2 3.5 3.24 3.5 4.75v1.5c0 .79.355 1.495.895 2-.54.505-.895 1.21-.895 2v1.5c0 .79.355 1.495.895 2-.54.505-.895 1.21-.895 2v1.5C3.5 18.76 4.74 20 6.25 20h5.25q-.299-.713-.425-1.5H6.25c-.7 0-1.25-.55-1.25-1.25v-1.5c0-.7.55-1.25 1.25-1.25h5.485c.285-.55.65-1.055 1.08-1.5H6.25C5.55 13 5 12.45 5 11.75v-1.5C5 9.55 5.55 9 6.25 9h11.5c.7 0 1.25.55 1.25 1.25v.925c.53.125 1.03.315 1.5.56V10.25c0-.79-.355-1.495-.895-2 .54-.505.895-1.21.895-2v-1.5C20.5 3.24 19.26 2 17.75 2zm0 1.5h11.5c.7 0 1.25.55 1.25 1.25v1.5c0 .7-.55 1.25-1.25 1.25H6.25C5.55 7.5 5 6.95 5 6.25v-1.5c0-.7.55-1.25 1.25-1.25M17.5 12a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11M15 14.5a.5.5 0 0 1 .5.5v1.5c0 1.103.897 2 2 2h1.793l-.646-.646a.5.5 0 1 1 .707-.707l1.5 1.5a.5.5 0 0 1 0 .707l-1.5 1.5a.5.5 0 1 1-.707-.707l.646-.647H17.5c-1.655 0-3-1.346-3-3V15a.5.5 0 0 1 .5-.5' />
  </svg>
);
export default SvgIconDataMigration;
