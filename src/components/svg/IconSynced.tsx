import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconSynced = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12.985.993a.75.75 0 0 0-.515.227l-1.936 1.935a.749.749 0 0 0-.141.142l-.173.173a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06l-1.203-1.203A7.481 7.481 0 0 1 19.5 12a7.477 7.477 0 0 1-3.183 6.126.75.75 0 1 0 .866 1.226A8.991 8.991 0 0 0 21 12c0-4.701-3.627-8.568-8.229-8.96l.76-.76a.75.75 0 0 0-.546-1.287ZM7.29 4.506a.75.75 0 0 0-.472.142A8.991 8.991 0 0 0 3 12c0 4.701 3.627 8.567 8.229 8.96l-.76.76a.75.75 0 1 0 1.061 1.06l1.936-1.935a.748.748 0 0 0 .141-.142l.173-.173a.75.75 0 0 0 0-1.06l-2.25-2.25a.75.75 0 1 0-1.06 1.06l1.203 1.203A7.481 7.481 0 0 1 4.5 12a7.477 7.477 0 0 1 3.183-6.126.75.75 0 0 0-.394-1.368Z' />
  </svg>
);
export default SvgIconSynced;
