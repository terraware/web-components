import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconMyLocation = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M11.988 1.49a.75.75 0 0 0-.738.76v.788a9.006 9.006 0 0 0-8.212 8.212H2.25a.75.75 0 1 0 0 1.5h.788a9.006 9.006 0 0 0 8.212 8.212v.788a.752.752 0 0 0 1.284.537.75.75 0 0 0 .216-.537v-.788a8.96 8.96 0 0 0 4.97-2.02 9 9 0 0 0 3.242-6.192h.788q.037 0 .075-.003a.75.75 0 0 0-.075-1.497h-.788c-.005-.056-.003-.113-.009-.169a9 9 0 0 0-3.925-6.542 8.94 8.94 0 0 0-4.278-1.5V2.25a.75.75 0 0 0-.762-.76m-.738 3.048v.712a.751.751 0 1 0 1.5 0v-.712a7.46 7.46 0 0 1 3.447 1.24 7.465 7.465 0 0 1 3.264 5.453v.019h-.711a.75.75 0 1 0 0 1.5h.712a7.5 7.5 0 0 1-.298 1.483 7.49 7.49 0 0 1-6.395 5.228h-.019v-.711a.75.75 0 1 0-1.5 0v.712a7.487 7.487 0 0 1-6.712-6.712h.712q.037 0 .075-.003a.75.75 0 0 0-.075-1.497h-.712l.001-.019a7.485 7.485 0 0 1 6.711-6.693M12 9.5c-.77 0-1.444.316-1.873.799A2.55 2.55 0 0 0 9.5 12c0 .604.198 1.218.627 1.701.43.483 1.102.799 1.873.799s1.444-.316 1.873-.799.627-1.097.627-1.701-.198-1.218-.627-1.701C13.443 9.816 12.771 9.5 12 9.5m0 1.5c.396 0 .598.121.752.295.154.173.248.434.248.705s-.094.532-.248.705c-.154.174-.356.295-.752.295s-.598-.121-.752-.295A1.08 1.08 0 0 1 11 12q0-.102.017-.2c.033-.196.115-.375.231-.505.154-.174.356-.295.752-.295' />
  </svg>
);
export default SvgIconMyLocation;
