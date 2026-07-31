import React, { type JSX, useState } from 'react';

import { Typography } from '@mui/material';
import { StoryFn } from '@storybook/react';

import Button from '../components/Button/Button';
import PhotosCarousel, { PhotoItem, PhotosCarouselProps } from '../components/PhotosCarousel';

export default {
  title: 'Photos Carousel',
  component: PhotosCarousel,
};

const SAMPLE_PHOTOS: PhotoItem[] = [
  {
    url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/62a17149aa7b1acd29fa1695_22_TF_Website_Homepage_Banner_5000x2500px_04%20(1).jpg',
  },
  {
    url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/63447bf401a1314055b50708_Terraformation-25%20(1)-p-1600.jpg',
  },
  {
    url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/63447cc759b9f238760b40b1_DSC_3921-II-EDIT.jpg',
  },
];

// Uncontrolled carousel with its own built-in arrows.
export const BuiltInArrows = (): JSX.Element => <PhotosCarousel photos={SAMPLE_PHOTOS} showArrows={true} />;

// Controlled by external Prev/Next buttons (as ViewPhotosDialog uses it).
const ControlledTemplate: StoryFn<PhotosCarouselProps> = (args: PhotosCarouselProps) => {
  const [slide, setSlide] = useState(0);
  return (
    <>
      <PhotosCarousel {...args} selectedSlide={slide} onSlideChange={setSlide} />
      <Button label='Previous' priority='secondary' onClick={() => setSlide((s) => Math.max(0, s - 1))} />
      <Button label='Next' onClick={() => setSlide((s) => Math.min(SAMPLE_PHOTOS.length - 1, s + 1))} />
    </>
  );
};

export const ControlledExternalButtons = ControlledTemplate.bind({});
ControlledExternalButtons.args = { photos: SAMPLE_PHOTOS };

export const NumberedWithDecorations = (): JSX.Element => (
  <PhotosCarousel
    photos={SAMPLE_PHOTOS.map((p, i) => ({ ...p, decoration: <Typography>Caption for photo #{i + 1}</Typography> }))}
    showArrows={true}
    numbered={true}
  />
);

export const SinglePhoto = (): JSX.Element => <PhotosCarousel photos={[SAMPLE_PHOTOS[0]]} showArrows={true} />;
