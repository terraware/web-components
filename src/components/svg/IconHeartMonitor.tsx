import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgIconHeartMonitor = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M4.75 3C3.24 3 2 4.24 2 5.75v12.5C2 19.76 3.24 21 4.75 21h14.5c1.51 0 2.75-1.24 2.75-2.75V5.75C22 4.24 20.76 3 19.25 3H4.75Zm0 1.5h14.5c.7 0 1.25.55 1.25 1.25v12.5c0 .7-.55 1.25-1.25 1.25H4.75c-.7 0-1.25-.55-1.25-1.25V13.5h1.25a.747.747 0 0 0 .643-.364l.758-1.263 1.413 3.182c.12.27.388.444.683.445a.769.769 0 0 0 .686-.44l1.733-3.814 1.878 5.257a.748.748 0 0 0 .706.497.75.75 0 0 0 .67-.414L15.715 13h.537a1.25 1.25 0 1 0 0-1.5H15.25a.75.75 0 0 0-.67.414l-1.215 2.429-1.909-5.346a.75.75 0 0 0-.675-.496.74.74 0 0 0-.714.438l-1.81 3.982-1.322-2.976a.75.75 0 0 0-1.328-.081L4.324 12H3.5V5.75c0-.7.55-1.25 1.25-1.25Z' />
  </svg>
);

export default SvgIconHeartMonitor;
