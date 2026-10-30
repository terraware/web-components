import React from 'react';

import { Box, TooltipProps } from '@mui/material';
import { Story } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import Button from '../components/Button/Button';
import Tooltip from '../components/Tooltip/Tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      options: [
        'bottom-end',
        'bottom-start',
        'bottom',
        'left-end',
        'left-start',
        'left',
        'right-end',
        'right-start',
        'right',
        'top-end',
        'top-start',
        'top',
      ],
      control: { type: 'radio' },
    },
  },
};

const Template: Story<TooltipProps> = (args) => {
  return (
    <Box sx={{ margin: '100px' }}>
      <Tooltip {...args}>
        <Button label='Tooltip Button' onClick={() => true} id='tooltipButton' type='productive' priority='primary' />
      </Tooltip>
    </Box>
  );
};

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  await userEvent.hover(within(canvasElement).getByRole('button', { name: 'Tooltip Button' }));
  const tooltip = await within(canvasElement.ownerDocument.body).findByRole('tooltip');
  await expect(tooltip).toBeVisible();
  await waitFor(() => expect(tooltip.firstElementChild).toHaveStyle({ opacity: '1', transform: 'none' }));
};

Default.args = {
  title: 'Title',
  placement: 'top',
};
