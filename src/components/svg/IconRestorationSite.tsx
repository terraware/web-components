import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconRestorationSite = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M12 1.5c-.775 0-1.495.247-1.999.751a2.445 2.445 0 0 0-.54.86c-.226-.069-.453-.139-.679-.134a2.467 2.467 0 0 0-1.596.653c-.597.537-.94 1.374-.897 2.264-.848.058-1.617.463-2.065 1.12-.476.698-.55 1.655-.162 2.54-.35.19-.648.453-.876.752a3.378 3.378 0 0 0-.686 2.046c0 .941.404 1.882 1.185 2.513.614.498 1.493.68 2.459.633.144.748.429 1.445.966 1.953.718.678 1.734 1.049 2.89 1.049v.75c0 .366-.122 1.021-.404 1.485-.282.465-.618.765-1.346.765a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5c-.728 0-1.064-.3-1.346-.765-.282-.464-.404-1.119-.404-1.485v-.75c1.156 0 2.172-.37 2.89-1.049.537-.508.822-1.205.966-1.953.966.047 1.845-.135 2.46-.633a3.228 3.228 0 0 0 1.184-2.513c0-.722-.23-1.45-.686-2.046a2.766 2.766 0 0 0-.877-.752c.39-.885.315-1.842-.16-2.54-.45-.657-1.218-1.062-2.066-1.12.043-.89-.3-1.727-.896-2.264a2.467 2.467 0 0 0-1.597-.653c-.226-.005-.454.066-.679.133a2.445 2.445 0 0 0-.54-.859C13.495 1.747 12.775 1.5 12 1.5ZM12 3c.475 0 .755.128.938.312.183.183.312.463.312.938a.75.75 0 0 0 1.28.53c.25-.25.454-.307.659-.303a.978.978 0 0 1 .621.268c.39.35.624.96.27 1.67a.75.75 0 0 0 .934 1.037c.701-.263 1.244 0 1.522.408s.357.937-.316 1.61a.75.75 0 0 0 .53 1.28c.376 0 .641.163.873.467.232.303.377.751.377 1.135 0 .51-.22 1.018-.628 1.348-.407.33-1.012.528-1.959.318a.751.751 0 0 0-.913.732c0 .696-.233 1.227-.64 1.611-.407.385-1.016.639-1.86.639v-.75a.751.751 0 1 0-1.5 0v3c0 .63.146 1.468.616 2.25h-2.232c.47-.782.616-1.62.616-2.25v-3a.75.75 0 1 0-1.5 0V17c-.844 0-1.453-.254-1.86-.639-.407-.384-.64-.915-.64-1.611a.75.75 0 0 0-.913-.732c-.947.21-1.552.012-1.96-.318A1.738 1.738 0 0 1 4 12.352c0-.384.145-.832.377-1.135.232-.304.497-.467.873-.467a.75.75 0 0 0 .53-1.28c-.673-.673-.594-1.202-.316-1.61.278-.407.82-.671 1.522-.408a.75.75 0 0 0 .935-1.037c-.355-.71-.12-1.32.268-1.67a.978.978 0 0 1 .623-.268c.204-.004.408.053.658.303a.75.75 0 0 0 1.28-.53c0-.475.129-.755.312-.938.183-.184.463-.312.938-.312Z' />
  </svg>
);
export default SvgIconRestorationSite;