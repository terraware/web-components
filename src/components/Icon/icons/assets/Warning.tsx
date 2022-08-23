import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgWarning = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 2.526c-.777 0-1.555.38-1.975 1.138l-7.74 13.984C1.47 19.122 2.575 21 4.26 21H19.74c1.686 0 2.791-1.878 1.975-3.352L13.975 3.664c-.42-.759-1.198-1.138-1.975-1.138Zm0 1.449c.254 0 .508.138.662.416l7.741 13.983c.297.536-.05 1.126-.662 1.126H4.26c-.612 0-.959-.59-.662-1.126l7.74-13.983c.154-.278.408-.416.662-.416Zm-.012 4.014a.75.75 0 0 0-.738.761v5a.751.751 0 1 0 1.5 0v-5a.75.75 0 0 0-.762-.76ZM12 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z' />
  </svg>
);

export default SvgWarning;
