import { useState } from 'react';
import { StoryFn } from '@storybook/react';
import React from 'react';
import ViewPhotosDialog, { ViewPhotosDialogProps } from '../components/ViewPhotosDialog';
import Button from '../components/Button/Button';
import { Typography } from '@mui/material';

export default {
  title: 'View Photos Dialog',
  component: ViewPhotosDialog,
};

const Template: StoryFn<ViewPhotosDialogProps> = (args: ViewPhotosDialogProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <ViewPhotosDialog {...args} open={modalOpen} onClose={() => setModalOpen(false)} />
      <Button label='View Photos' onClick={() => setModalOpen(true)} />
    </>
  );
};

const captionForPhoto = (num: number): JSX.Element => {
  return <Typography>Caption for photo #{num}</Typography>;
};

export const Default = Template.bind({});
Default.args = {
  open: true,
  title: 'Photos',
  nextButtonLabel: 'Next',
  prevButtonLabel: 'Previous',
  initialSelectedSlide: 0,
  numbered: true,
  dots: true,
  photos: [
    {
      url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/62a17149aa7b1acd29fa1695_22_TF_Website_Homepage_Banner_5000x2500px_04%20(1).jpg',
      decoration: captionForPhoto(1),
    },
    {
      url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/63447bf401a1314055b50708_Terraformation-25%20(1)-p-1600.jpg',
      decoration: captionForPhoto(2),
    },
    {
      url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/63447cc759b9f238760b40b1_DSC_3921-II-EDIT.jpg',
      decoration: captionForPhoto(3),
    },
    {
      url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/627dec38eb6be07860a89787_harvest-image.jpeg',
      decoration: captionForPhoto(4),
    },
    {
      url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/6369552d24c9fbbcebdf6b2b_planting%20trees_72pix.jpg',
    },
    {
      url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/636974e3fde8918ba5951450_DSC_4362%20(1)-p-1080.jpg',
    },
    {
      url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/63694a55176f1e0af5ae513f_IMG_15673757-p-1080.jpg',
    },
    {
      url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/6347e3526ed75455de6a6a64_accel-02_hero-bg-p-1080.jpg',
    },
    {
      url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/636e6fa9aa9e99e90d5e39b1_2022_TF_Website_Solutions_Mobile-Field-App6.5-Carousel%2001.jpg',
    },
  ],
};
