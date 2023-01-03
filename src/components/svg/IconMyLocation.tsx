import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconMyLocation = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d='M11.988 1.49a.75.75 0 0 0-.738.76v.788a9.006 9.006 0 0 0-8.212 8.212H2.25a.75.75 0 1 0 0 1.5h.788a9.006 9.006 0 0 0 8.212 8.212v.788a.752.752 0 0 0 1.284.537.75.75 0 0 0 .216-.537v-.788a8.955 8.955 0 0 0 4.97-2.02 8.991 8.991 0 0 0 3.242-6.192h.788c.025 0 .05 0 .075-.003a.75.75 0 0 0-.075-1.497h-.788c-.005-.056-.003-.113-.009-.169a9.009 9.009 0 0 0-3.925-6.542 8.942 8.942 0 0 0-4.278-1.5V2.25a.75.75 0 0 0-.762-.76Zm-.738 3.048v.712a.751.751 0 1 0 1.5 0v-.712a7.459 7.459 0 0 1 3.447 1.24 7.465 7.465 0 0 1 3.264 5.453v.019h-.711a.75.75 0 1 0 0 1.5h.712a7.49 7.49 0 0 1-.298 1.483 7.49 7.49 0 0 1-6.395 5.228h-.019v-.711a.75.75 0 1 0-1.5 0v.712a7.487 7.487 0 0 1-6.712-6.712h.712c.025 0 .05 0 .075-.003a.75.75 0 0 0-.075-1.497h-.712l.001-.019a7.485 7.485 0 0 1 6.711-6.693ZM12 9.5c-.77 0-1.444.316-1.873.799A2.547 2.547 0 0 0 9.5 12c0 .604.198 1.218.627 1.701.43.483 1.102.799 1.873.799.77 0 1.444-.316 1.873-.799.43-.483.627-1.097.627-1.701 0-.604-.198-1.218-.627-1.701-.43-.483-1.102-.799-1.873-.799Zm0 1.5c.396 0 .598.121.752.295.154.173.248.434.248.705 0 .27-.094.532-.248.705-.154.174-.356.295-.752.295s-.598-.121-.752-.295A1.079 1.079 0 0 1 11 12c0-.068.005-.135.017-.2.033-.196.115-.375.231-.505.154-.174.356-.295.752-.295Z' />
  </svg>
);
export default SvgIconMyLocation;
