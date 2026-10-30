import React from 'react';

import { Story } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import IconTooltip, { IconTooltipProps } from '../components/IconTooltip';

export default {
  title: 'Icon Tooltip',
  component: IconTooltip,
};

const Template: Story<IconTooltipProps> = (args) => {
  return <IconTooltip {...args} />;
};

const showTooltip: NonNullable<Story<IconTooltipProps>['play']> = async ({ canvasElement }) => {
  await userEvent.hover(canvasElement.querySelector('span')!);
  const tooltip = await within(canvasElement.ownerDocument.body).findByRole('tooltip');
  await expect(tooltip).toBeVisible();
  await waitFor(() => expect(tooltip.firstElementChild).toHaveStyle({ opacity: '1', transform: 'none' }));
};

export const Default = Template.bind({});
Default.play = showTooltip;
Default.args = {
  iconName: 'info',
  placement: 'top-start',
  title: 'This is a simple icon tooltip with default icon & placement and only text content.',
};

export const HTML = Template.bind({});
HTML.play = showTooltip;
HTML.args = {
  iconName: 'info',
  placement: 'top-start',
  title: (
    <>
      This is a simple icon tooltip with default icon & placement and some HTML content. Try this{' '}
      <a href='https://www.google.com' target='_blank' rel='noreferrer'>
        Google link
      </a>
      .
    </>
  ),
};
