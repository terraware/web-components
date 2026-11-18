import React from 'react';

import { render } from '@testing-library/react';
import { Settings } from 'luxon';

import DatePicker from './DatePicker';

const renderDatePicker = (defaultTimeZone?: string) =>
  render(
    <DatePicker
      aria-label='date'
      defaultTimeZone={defaultTimeZone}
      id='date'
      label='Date'
      value={Date.parse('2024-01-01T03:00:00Z')}
    />
  );

test('leaves the Luxon default zone unchanged', () => {
  const originalZone = Settings.defaultZone;

  renderDatePicker('America/Los_Angeles');

  expect(Settings.defaultZone).toBe(originalZone);
});

test('shows the date in the default time zone', () => {
  const { container } = renderDatePicker('America/Los_Angeles');

  expect(container.querySelector('input')).toHaveValue('2023-12-31');
});

test('shows the date in UTC without a default time zone', () => {
  const { container } = renderDatePicker();

  expect(container.querySelector('input')).toHaveValue('2024-01-01');
});
