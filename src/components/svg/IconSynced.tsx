import * as React from 'react';
import { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconSynced = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12.985.993a.75.75 0 0 0-.515.227l-1.936 1.935a.8.8 0 0 0-.141.142l-.173.173a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06l-1.203-1.203A7.48 7.48 0 0 1 19.5 12a7.48 7.48 0 0 1-3.183 6.126.75.75 0 1 0 .866 1.226A8.99 8.99 0 0 0 21 12c0-4.701-3.627-8.568-8.228-8.96l.758-.76a.75.75 0 0 0-.545-1.287M7.29 4.506a.75.75 0 0 0-.472.142A8.99 8.99 0 0 0 3 12c0 4.701 3.627 8.567 8.229 8.96l-.76.76a.75.75 0 1 0 1.061 1.06l1.936-1.935a.8.8 0 0 0 .141-.142l.173-.173a.75.75 0 0 0 0-1.06l-2.25-2.25a.75.75 0 1 0-1.06 1.06l1.203 1.203A7.48 7.48 0 0 1 4.5 12a7.48 7.48 0 0 1 3.183-6.126.75.75 0 0 0-.394-1.368' />
  </svg>
);
export default SvgIconSynced;
