import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconSettings = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 2c-.789 0-1.549.1-2.274.269a.75.75 0 0 0-.576.649l-.159 1.451a1.5 1.5 0 0 1-2.095 1.21L5.561 4.99a.75.75 0 0 0-.85.174A10 10 0 0 0 2.43 9.101a.75.75 0 0 0 .274.822l1.183.867a1.5 1.5 0 0 1 0 2.42l-1.183.866a.75.75 0 0 0-.274.822 10 10 0 0 0 2.283 3.937.75.75 0 0 0 .85.173l1.332-.587a1.5 1.5 0 0 1 2.096 1.21l.16 1.451a.75.75 0 0 0 .574.648A10 10 0 0 0 12 22c.788 0 1.549-.1 2.274-.269a.75.75 0 0 0 .576-.649l.159-1.451a1.498 1.498 0 0 1 2.095-1.21l1.334.587a.75.75 0 0 0 .85-.173 10 10 0 0 0 2.282-3.937.75.75 0 0 0-.274-.822l-1.183-.866a1.498 1.498 0 0 1 0-2.42l1.183-.866a.75.75 0 0 0 .274-.822 10 10 0 0 0-2.283-3.937.75.75 0 0 0-.85-.173l-1.334.587a1.5 1.5 0 0 1-2.094-1.21l-.16-1.451a.75.75 0 0 0-.574-.648A10 10 0 0 0 12 2m0 1.5c.487 0 .955.087 1.424.17l.094.862a3.003 3.003 0 0 0 4.19 2.42l.793-.348a8.4 8.4 0 0 1 1.428 2.461l-.703.516a3.002 3.002 0 0 0 0 4.838l.703.516a8.4 8.4 0 0 1-1.428 2.461l-.793-.348a3 3 0 0 0-4.19 2.42l-.094.862c-.469.082-.937.17-1.424.17s-.955-.087-1.424-.17l-.094-.862a3.003 3.003 0 0 0-4.19-2.42l-.793.349a8.4 8.4 0 0 1-1.428-2.462l.703-.516a3.002 3.002 0 0 0 0-4.839l-.703-.516c.337-.905.82-1.73 1.429-2.461l.792.348a3 3 0 0 0 4.19-2.419l.094-.862c.469-.082.937-.17 1.424-.17M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4m0 1.5c1.39 0 2.5 1.11 2.5 2.5s-1.11 2.5-2.5 2.5-2.5-1.11-2.5-2.5 1.11-2.5 2.5-2.5' />
  </svg>
);
export default SvgIconSettings;