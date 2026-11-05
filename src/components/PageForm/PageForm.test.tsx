import React from 'react';

import { ThemeProvider } from '@mui/material';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event';

import theme from '../../theme';
import PageForm, { PageFormProps } from './index';

const renderForm = (props: Partial<PageFormProps> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <PageForm
        cancelID='cancel'
        saveID='save'
        onCancel={() => undefined}
        onSave={() => undefined}
        cancelButtonText='Cancel'
        saveButtonText='Save'
        {...props}
      >
        Form contents
      </PageForm>
    </ThemeProvider>
  );

test('disables Save, Cancel, and additional actions until saving resolves', async () => {
  const user = userEvent.setup({ pointerEventsCheck: PointerEventsCheckLevel.Never });
  let resolveSave!: () => void;
  const pending = new Promise<void>((resolve) => {
    resolveSave = resolve;
  });
  const onSave = rstest.fn(() => pending);
  const onCancel = rstest.fn();
  const onAdditionalClick = rstest.fn();
  renderForm({
    onSave,
    onCancel,
    additionalRightButtons: [
      { id: 'additional', text: 'Additional action', disabled: false, onClick: onAdditionalClick },
      { id: 'unavailable', text: 'Unavailable action', disabled: true, onClick: onAdditionalClick },
    ],
  });

  const save = screen.getByRole('button', { name: 'Save' });
  const cancel = screen.getByRole('button', { name: 'Cancel' });
  const additional = screen.getByRole('button', { name: 'Additional action' });
  await user.click(save);

  expect(save).toBeDisabled();
  expect(cancel).toBeDisabled();
  expect(additional).toBeDisabled();
  await user.click(save);
  await user.click(cancel);
  await user.click(additional);
  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onCancel).not.toHaveBeenCalled();
  expect(onAdditionalClick).not.toHaveBeenCalled();

  await act(async () => {
    resolveSave();
    await pending;
  });

  expect(save).toBeEnabled();
  expect(cancel).toBeEnabled();
  expect(additional).toBeEnabled();
  expect(screen.getByRole('button', { name: 'Unavailable action' })).toBeDisabled();
});

test('blocks a second save before React re-renders', async () => {
  let resolveSave!: () => void;
  const pending = new Promise<void>((resolve) => {
    resolveSave = resolve;
  });
  const onSave = rstest.fn(() => pending);
  renderForm({ onSave });
  const save = screen.getByRole('button', { name: 'Save' });

  act(() => {
    save.click();
    save.click();
  });

  expect(onSave).toHaveBeenCalledTimes(1);
  await act(async () => {
    resolveSave();
    await pending;
  });
});

test('re-enables Save and Cancel after a rejected save and permits retry', async () => {
  const user = userEvent.setup();
  let rejectSave!: (reason: Error) => void;
  const pending = new Promise<void>((_, reject) => {
    rejectSave = reject;
  });
  const error = new Error('Save failed');
  const logError = rstest.spyOn(console, 'error').mockImplementation(() => undefined);
  const onSave = rstest.fn<() => void | Promise<unknown>>().mockReturnValueOnce(pending);
  try {
    renderForm({ onSave });
    const save = screen.getByRole('button', { name: 'Save' });
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    await user.click(save);
    expect(save).toBeDisabled();
    expect(cancel).toBeDisabled();

    await act(async () => {
      rejectSave(error);
      await pending.catch(() => undefined);
    });

    expect(save).toBeEnabled();
    expect(cancel).toBeEnabled();
    expect(logError).toHaveBeenCalledWith(error);
    await user.click(save);
    expect(onSave).toHaveBeenCalledTimes(2);
  } finally {
    logError.mockRestore();
  }
});

test('supports synchronous saves', async () => {
  const user = userEvent.setup();
  const onSave = rstest.fn();
  renderForm({ onSave });
  const save = screen.getByRole('button', { name: 'Save' });

  await user.click(save);

  expect(onSave).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(save).toBeEnabled());
  expect(screen.getByRole('button', { name: 'Cancel' })).toBeEnabled();
});

test('clears processing when a synchronous save throws', async () => {
  const user = userEvent.setup();
  const error = new Error('Save failed');
  const logError = rstest.spyOn(console, 'error').mockImplementation(() => undefined);
  try {
    renderForm({
      onSave: () => {
        throw error;
      },
    });

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeEnabled();
    expect(logError).toHaveBeenCalledWith(error);
  } finally {
    logError.mockRestore();
  }
});

test('honors cancelDisabled and saveDisabled', () => {
  renderForm({ cancelDisabled: true, saveDisabled: true });

  expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
});
