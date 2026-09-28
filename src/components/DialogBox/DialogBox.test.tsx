import React from 'react';

import { render, screen } from '@testing-library/react';

import DialogBox from './DialogBox';

test('renders an accessible modal dialog named by its title', () => {
  render(<DialogBox open={true} size='medium' title='Example dialog' />);

  expect(screen.getByRole('dialog', { name: 'Example dialog' })).toHaveAttribute('aria-modal', 'true');
});
