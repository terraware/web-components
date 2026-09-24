import React from 'react';

import { Story } from '@storybook/react';

import Icon, { Props as IconProps } from '../components/Icon/Icon';
import icons, { IconName } from '../components/Icon/icons';

export default {
  title: 'Icon',
  component: Icon,
};

const Template: Story<IconProps> = (args) => {
  return <Icon {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  name: 'lock',
};

export const AllIcons: Story = () => {
  const iconNames = (Object.keys(icons) as IconName[]).sort();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      {iconNames.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Icon name={name} size='medium' />
          <span style={{ fontSize: '0.75rem', textAlign: 'center', maxWidth: '80px', wordBreak: 'break-word' }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};
