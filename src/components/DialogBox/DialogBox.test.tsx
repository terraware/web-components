import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DialogBox from './DialogBox';

test('renders an accessible modal dialog named by its title', async () => {
  render(<DialogBox open={true} size='medium' title='Example dialog' />);

  const dialog = screen.getByRole('dialog', { name: 'Example dialog' });
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  await waitFor(() => expect(dialog).toHaveFocus());
});

test('contains focus while open and restores it when closed', async () => {
  const user = userEvent.setup();
  const { rerender } = render(
    <>
      <button>Open dialog</button>
      <DialogBox open={false} size='medium' title='Example dialog'>
        <button>Dialog action</button>
      </DialogBox>
    </>
  );
  const trigger = screen.getByRole('button', { name: 'Open dialog' });
  trigger.focus();

  rerender(
    <>
      <button>Open dialog</button>
      <DialogBox open={true} size='medium' title='Example dialog'>
        <button>Dialog action</button>
      </DialogBox>
    </>
  );

  const dialog = screen.getByRole('dialog', { name: 'Example dialog' });
  await waitFor(() => expect(dialog).toHaveFocus());

  trigger.focus();
  expect(dialog).toHaveFocus();

  await user.tab({ shift: true });
  expect(screen.getByRole('button', { name: 'Dialog action' })).toHaveFocus();

  rerender(
    <>
      <button>Open dialog</button>
      <DialogBox open={false} size='medium' title='Example dialog'>
        <button>Dialog action</button>
      </DialogBox>
    </>
  );
  await waitFor(() => expect(trigger).toHaveFocus());
});
