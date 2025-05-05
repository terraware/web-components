import React from 'react';
import { Story } from '@storybook/react';
import PlacementWrapper, { PlacementWrapperProps } from '../components/PlacementWrapper';
import { Button } from '../index';
import { Typography } from '@mui/material';

export default {
  title: 'PlacementWrapper',
  component: PlacementWrapper,
  argTypes: {
    objectPlacement: {
      options: ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'left-start', 'left', 'left-end', 'right-start', 'right', 'right-end'],
      control: { type: 'radio' },
    },
  },
};

const Template: Story<PlacementWrapperProps> = (args) => <PlacementWrapper {...args} />;

const WithElements: Story<PlacementWrapperProps> = (args) => <Template
  {...args}
  placedObject={<Button icon={'iconComment'} onClick={() => null} />}
>
  <Typography
    width={'100%'}
    height={'100px'}
    display={'flex'}
    border={'1px solid black'}
    borderRadius={'8px'}
    padding={'8px'}
    textAlign={'center'}
    style={{ backgroundColor: 'lightgrey' }}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua.
  </Typography>
</Template>;

export const Default = WithElements.bind({});
