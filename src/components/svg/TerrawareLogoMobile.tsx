import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTerrawareLogoMobile = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 106 24' aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill='#1B5035'
      d='M26.049 14.737a23.95 23.95 0 0 0-9.517-3.63v-3.4c0-.921-.17-1.67-.566-2.073-.283-.404-.85-.634-1.53-.634h-1.925v1.21h1.586c.793 0 1.076.576 1.076 1.555v3.17c-.68-.059-1.416-.116-2.096-.116-.566 0-1.076 0-1.643.057V5l-1.416.403v5.589c-3.625.46-7.024 1.786-9.97 3.745a29.1 29.1 0 0 1 9.97-2.996v4.551c0 .922.17 1.671.566 2.074.34.404.85.634 1.53.634h1.983v-1.21H12.51c-.794 0-1.077-.576-1.077-1.555v-4.61c.567-.057 1.077-.057 1.643-.057.375 0 .736.015 1.09.03.34.014.673.027 1.006.027V19l1.416-.403v-6.799a28 28 0 0 1 9.46 2.939'
    />
    <path
      fill='#2C8658'
      d='M30.912 8.13V6.365h9.284V8.13h-3.597V18h-2.09V8.13zm13.08 10.04q-1.311 0-2.267-.545a3.7 3.7 0 0 1-1.46-1.557q-.51-1.011-.511-2.38 0-1.347.511-2.364a3.87 3.87 0 0 1 1.443-1.591q.927-.574 2.177-.574.806 0 1.522.261.722.255 1.273.796.557.54.875 1.375.318.83.318 1.977v.63H40.72v-1.386h5.182a2.2 2.2 0 0 0-.256-1.05q-.25-.467-.699-.734a1.97 1.97 0 0 0-1.034-.267q-.63 0-1.108.307-.477.3-.744.796a2.3 2.3 0 0 0-.267 1.073v1.21q0 .762.278 1.307.279.54.778.83.501.284 1.17.284.45 0 .813-.125.364-.13.631-.38t.404-.62l1.92.216q-.181.761-.693 1.33a3.4 3.4 0 0 1-1.296.875q-.79.306-1.806.306m5.121-.17V9.273h1.995v1.454h.09q.24-.756.819-1.165.585-.414 1.335-.414.17 0 .38.017.217.01.358.04v1.892a2 2 0 0 0-.414-.08 4 4 0 0 0-.54-.04 2.1 2.1 0 0 0-1.011.245q-.444.238-.7.664t-.255.983V18zm5.844 0V9.273h1.994v1.454h.091q.24-.756.818-1.165.585-.414 1.336-.414.17 0 .38.017.216.01.358.04v1.892a2 2 0 0 0-.414-.08 4 4 0 0 0-.54-.04 2.1 2.1 0 0 0-1.012.245q-.442.238-.699.664-.255.427-.255.983V18zm8.199.176a3.6 3.6 0 0 1-1.495-.295q-.658-.302-1.045-.887-.38-.584-.38-1.443 0-.739.272-1.222.273-.482.744-.772a3.8 3.8 0 0 1 1.063-.438 9 9 0 0 1 1.233-.221q.767-.08 1.244-.142.478-.069.693-.205.222-.142.222-.437v-.035q0-.642-.38-.994-.381-.352-1.097-.352-.756 0-1.2.33-.436.33-.59.778l-1.92-.273q.227-.795.75-1.33.522-.54 1.278-.806a4.9 4.9 0 0 1 1.67-.273q.631 0 1.256.148.625.147 1.142.488.517.336.83.915.318.58.318 1.45V18h-1.977v-1.199h-.069a2.5 2.5 0 0 1-.528.682 2.5 2.5 0 0 1-.847.506q-.506.187-1.187.187m.534-1.511q.619 0 1.074-.244.454-.25.699-.66.25-.409.25-.892v-1.028a1 1 0 0 1-.33.148 5 5 0 0 1-.511.119q-.284.051-.563.09l-.483.069q-.46.063-.824.205a1.37 1.37 0 0 0-.573.397q-.21.25-.21.648 0 .568.414.858.415.29 1.057.29M71.133 18l-2.466-8.727h2.097l1.534 6.136h.08l1.568-6.136h2.073l1.569 6.102h.085l1.511-6.102h2.103L78.815 18h-2.142l-1.636-5.898h-.12L73.281 18zm13.601.176a3.6 3.6 0 0 1-1.494-.295q-.66-.302-1.046-.887-.38-.584-.38-1.443 0-.739.272-1.222.273-.482.745-.772a3.8 3.8 0 0 1 1.062-.438 9 9 0 0 1 1.233-.221q.767-.08 1.244-.142.478-.069.694-.205.22-.142.221-.437v-.035q0-.642-.38-.994-.381-.352-1.097-.352-.756 0-1.199.33-.438.33-.591.778l-1.92-.273q.226-.795.75-1.33.522-.54 1.278-.806a4.9 4.9 0 0 1 1.67-.273q.631 0 1.256.148.625.147 1.142.488.517.336.83.915.318.58.318 1.45V18h-1.977v-1.199h-.069q-.187.364-.528.682a2.5 2.5 0 0 1-.847.506q-.506.187-1.187.187m.534-1.511q.619 0 1.074-.244.454-.25.699-.66.25-.409.25-.892v-1.028a1 1 0 0 1-.33.148 5 5 0 0 1-.511.119q-.284.051-.563.09l-.483.069q-.46.063-.823.205a1.37 1.37 0 0 0-.574.397q-.21.25-.21.648 0 .568.414.858.415.29 1.057.29M90.91 18V9.273h1.994v1.454h.091q.24-.756.819-1.165.585-.414 1.335-.414.17 0 .38.017.216.01.358.04v1.892a2 2 0 0 0-.414-.08 4 4 0 0 0-.54-.04 2.1 2.1 0 0 0-1.012.245q-.443.238-.698.664t-.256.983V18zm9.348.17q-1.312 0-2.267-.545a3.7 3.7 0 0 1-1.46-1.557q-.512-1.011-.512-2.38 0-1.347.512-2.364a3.87 3.87 0 0 1 1.443-1.591q.926-.574 2.176-.574.807 0 1.523.261.721.255 1.273.796.556.54.875 1.375.318.83.318 1.977v.63h-7.154v-1.386h5.182a2.2 2.2 0 0 0-.255-1.05q-.25-.467-.699-.734a1.97 1.97 0 0 0-1.034-.267q-.63 0-1.108.307-.478.3-.745.796a2.3 2.3 0 0 0-.267 1.073v1.21q0 .762.279 1.307.278.54.778.83.5.284 1.171.284.449 0 .812-.125.364-.13.631-.38t.403-.62l1.921.216q-.183.761-.694 1.33a3.4 3.4 0 0 1-1.295.875q-.79.306-1.807.306'
    />
  </svg>
);
export default SvgTerrawareLogoMobile;
