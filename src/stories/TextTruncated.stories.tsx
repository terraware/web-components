import { Story } from '@storybook/react';
import React from 'react';
import TextTruncated, {
  Props as TextTruncatedProps,
} from '../components/TextTruncated/index';

export default {
  title: 'TextTruncated',
  component: TextTruncated,
};

const Template: Story<TextTruncatedProps> = (args) => {
  return <TextTruncated {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  stringList: ['elephant', 'foo', 'bar', 'baz', 'spam', 'bacon', 'eggs'],
  maxLengthPx: 200,
  showAllStyle: {fontSize: 14},
  textStyle: {fontSize: 14},
  moreSeparator: '...',
  moreText: 'more',
  placeHolder: undefined,
};

export const WithPlaceholder = Template.bind({});

WithPlaceholder.args = {
  stringList: ['thing1', 'thing2'],
  maxLengthPx: 200,
  showAllStyle: {fontSize: 14},
  textStyle: {fontSize: 14},
  moreSeparator: '...',
  moreText: 'more',
  placeHolder: (<span style={{color: 'red'}}>Nothing Here!</span>),
};
