import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableTableV2 from '.';

test.each([
  ['Enter', { isComposing: true }],
  ['Escape', { isComposing: true }],
  ['Enter', { keyCode: 229 }],
  ['Escape', { keyCode: 229 }],
] as const)('ignores %s during composition (%o) and saves after composition ends', async (key, flags) => {
  const user = userEvent.setup();
  const onSave = rs.fn().mockResolvedValue(undefined);
  render(
    <EditableTableV2
      clearAllFiltersLabel='Clear'
      enableEditing
      data={[{ name: 'Alpha' }]}
      columns={[{ id: 'name', header: 'Name', accessorKey: 'name', editConfig: { onSave } }]}
    />
  );
  fireEvent.doubleClick(screen.getByText('Alpha'));
  const input = screen.getByRole('textbox', { name: 'Name' });
  fireEvent.compositionStart(input);
  fireEvent.change(input, { target: { value: '日本語' } });
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...flags });
  fireEvent(input, event);
  expect(event.defaultPrevented).toBe(false);
  expect(screen.getByRole('textbox', { name: 'Name' })).toBe(input);
  expect(input).toHaveFocus();
  expect(onSave).not.toHaveBeenCalled();
  fireEvent.compositionEnd(input);
  await user.keyboard('{Enter}');
  await waitFor(() => expect(screen.queryByRole('textbox', { name: 'Name' })).not.toBeInTheDocument());
  expect(onSave).toHaveBeenCalledExactlyOnceWith({ name: 'Alpha' }, '日本語', 'name');
});
