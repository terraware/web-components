import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgHelp = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2Zm0 1.5c4.703 0 8.5 3.797 8.5 8.5 0 4.703-3.797 8.5-8.5 8.5A8.489 8.489 0 0 1 3.5 12c0-4.703 3.797-8.5 8.5-8.5Zm0 3c-1.648 0-3 1.352-3 3v.25a.75.75 0 1 0 1.5 0V9.5c0-.837.663-1.5 1.5-1.5s1.5.663 1.5 1.5c0 1.17-.304 1.317-.838 1.736-.267.21-.616.452-.915.859-.299.407-.497.974-.497 1.655a.751.751 0 1 0 1.5 0c0-.427.083-.6.206-.768.123-.167.336-.334.632-.566C14.179 11.951 15 11.079 15 9.5c0-1.648-1.352-3-3-3Zm0 9.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z' />
  </svg>
);

export default SvgHelp;
