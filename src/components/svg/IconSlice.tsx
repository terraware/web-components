import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconSlice = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M16.646 1.504c-1.021.001-2.01.395-2.885 1.013a.75.75 0 0 0-.559.337 1 1 0 0 0-.068.06l-7.905 7.903a2.22 2.22 0 0 0-.649 1.498l-.041 1.272-2.32 2.32a.75.75 0 0 0-.204.677l1.039 5.197a.75.75 0 0 0 1.266.383l4.399-4.398 1.27-.041a2.22 2.22 0 0 0 1.498-.65l5.743-5.742c1.007-.17 1.988-.603 2.768-1.383.034-.033.044-.079.076-.113a.75.75 0 0 0 .408-.61c1.369-1.95 1.313-4.603-.398-6.314a4.83 4.83 0 0 0-3.439-1.41m-.007 1.492a3.34 3.34 0 0 1 2.384.978c1.063 1.062 1.224 2.655.551 3.971L15.06 3.431c.506-.258 1.036-.433 1.58-.435m-2.801 1.335 4.782 4.782c-.562.453-1.201.753-1.871.82a.75.75 0 0 0-.456.215l-5.867 5.867a.72.72 0 0 1-.486.21l-3.222.104a.707.707 0 0 1-.742-.742l.103-3.223a.72.72 0 0 1 .211-.486zm-.54 3.647a1 1 0 0 0-.687.302l-4.158 4.158a1 1 0 1 0 1.414 1.414l4.158-4.158a1 1 0 0 0-.727-1.716M4.48 15.767a2.24 2.24 0 0 0 2.059 2.056l-2.289 2.29-.686-3.43z' />
  </svg>
);
export default SvgIconSlice;
