import React from 'react';

import { act, render, screen } from '@testing-library/react';

import { getLocale, getStrings, setLocale, useStrings } from '.';
import { strings as en } from './strings-en';
import { strings as gx } from './strings-gx';

afterEach(() => setLocale('en'));

test('the locale defaults to English', () => {
  expect(getLocale()).toBe('en');
  expect(getStrings()).toBe(en);
});

test('setLocale switches the table', () => {
  setLocale('gx');

  expect(getLocale()).toBe('gx');
  expect(getStrings()).toBe(gx);
});

test('setLocale ignores a locale with no bundled table', () => {
  setLocale('ja');

  expect(getLocale()).toBe('en');
  expect(getStrings()).toBe(en);
});

test('every locale table covers the English key set', () => {
  expect(Object.keys(gx).sort()).toEqual(Object.keys(en).sort());
});

test('useStrings renders the current table', () => {
  const Label = () => <span>{useStrings().CANCEL}</span>;

  render(<Label />);

  expect(screen.getByText('Cancel')).toBeInTheDocument();
});

test('useStrings re-renders a mounted component when the locale changes', () => {
  const Label = () => <span>{useStrings().CANCEL}</span>;

  render(<Label />);
  act(() => setLocale('gx'));

  expect(screen.getByText(gx.CANCEL)).toBeInTheDocument();
});
