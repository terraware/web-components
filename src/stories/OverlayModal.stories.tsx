import React, { useState } from 'react';

import { Story } from '@storybook/react';

import Button from '../components/Button/Button';
import OverlayModal, { Props as OverlayModalProps } from '../components/OverlayModal/OverlayModal';

export default {
  title: 'Overlay Modal',
  component: OverlayModal,
};

const Template: Story<OverlayModalProps> = (args) => {
  return <OverlayModal {...args} open={true} />;
};

const WithButtonTemplate: Story<OverlayModalProps> = (args) => {
  const [opened, setOpened] = useState(false);

  return (
    <main>
      <button onClick={() => setOpened(true)}>Open Modal</button>
      <OverlayModal {...args} open={opened} onClose={() => setOpened(false)} />
    </main>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  open: true,
  children: (
    <div>
      <h2>Welcome to OverlayModal</h2>
      <p>This is a basic overlay modal with simple content.</p>
      <p>Click the X button to close, or press Escape, or click outside the modal.</p>
    </div>
  ),
};

export const WithBelowComponent = Template.bind({});
WithBelowComponent.args = {
  open: true,
  children: (
    <div>
      <h2>Modal with Below Component</h2>
      <p>This modal has content rendered below it.</p>
    </div>
  ),
  belowComponent: (
    <div style={{ padding: '16px', background: 'white', borderRadius: '8px' }}>
      <p>This content appears below the modal</p>
    </div>
  ),
};

export const WithComplexContent = Template.bind({});
WithComplexContent.args = {
  open: true,
  children: (
    <div>
      <h2>Complex Content Example</h2>
      <form>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='name'>Name:</label>
          <input id='name' type='text' style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='email'>Email:</label>
          <input id='email' type='email' style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='message'>Message:</label>
          <textarea id='message' rows={5} style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </div>
      </form>
    </div>
  ),
};

export const WithScrollableContent = Template.bind({});
WithScrollableContent.args = {
  open: true,
  children: (
    <div>
      <h2>Scrollable Content</h2>
      {Array.from({ length: 50 }, (_, i) => (
        <p key={i}>This is paragraph {i + 1}. The content is scrollable when it exceeds the modal height.</p>
      ))}
    </div>
  ),
};

export const InteractiveDemo = WithButtonTemplate.bind({});
InteractiveDemo.args = {
  children: (
    <div>
      <h2>Interactive Modal</h2>
      <p>This modal can be opened and closed interactively.</p>
      <p>Try:</p>
      <ul style={{ textAlign: 'left' }}>
        <li>Clicking the X button</li>
        <li>Pressing the Escape key</li>
        <li>Clicking outside the modal</li>
      </ul>
    </div>
  ),
};

export const DisableEscapeClose = WithButtonTemplate.bind({});
DisableEscapeClose.args = {
  onEscapeClose: false,
  children: (
    <div>
      <h2>Escape Close Disabled</h2>
      <p>This modal will not close when pressing the Escape key.</p>
      <p>You can only close it by clicking the X or clicking outside.</p>
    </div>
  ),
};

export const DisableClickOutClose = WithButtonTemplate.bind({});
DisableClickOutClose.args = {
  onClickOutClose: false,
  children: (
    <div>
      <h2>Click Outside Close Disabled</h2>
      <p>This modal will not close when clicking outside.</p>
      <p>You can only close it by clicking the X or pressing Escape.</p>
    </div>
  ),
};

export const WithButtons = WithButtonTemplate.bind({});
WithButtons.args = {
  children: (
    <div>
      <h2>Modal with Action Buttons</h2>
      <p>This demonstrates a modal with custom action buttons.</p>
      <div style={{ marginTop: '24px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <Button id='cancel' label='Cancel' onClick={() => alert('Cancel clicked')} size='medium' />
        <Button id='submit' label='Submit' onClick={() => alert('Submit clicked')} size='medium' />
      </div>
    </div>
  ),
  belowComponent: <Button id='help' label='Need Help?' onClick={() => alert('Help clicked')} size='small' />,
};
