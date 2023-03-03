import { Story } from '@storybook/react';
import React from 'react';
import { Box, TooltipProps } from '@mui/material';
import Tooltip from '../components/Tooltip/Tooltip';
import Button from '../components/Button/Button';

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      options: ['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start',
                'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'],
      control: { type: 'radio' },
    },
  },
};

const Template: Story<TooltipProps> = (args) => {
  return(
    <Box sx={{ margin: '100px' }}>
      <Tooltip {...args} >
        <Button
          label='Tooltip Button'
          onClick={() => true}
          id='tooltipButton'
          type='productive'
          priority='primary'
        />
      </Tooltip>
    </Box>
    );
};

export const Default = Template.bind({});

Default.args = {
  title: 'Title',
  placement: 'top',
};
