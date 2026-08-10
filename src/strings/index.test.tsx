import React from 'react';

import { act, render, screen } from '@testing-library/react';

import { getLocale, getStrings, setLocale, useStrings } from '.';
import { strings as en } from './strings-en';
import { strings as es } from './strings-es';

afterEach(() => setLocale('en'));

test('the locale defaults to English', () => {
  expect(getLocale()).toBe('en');
  expect(getStrings()).toBe(en);
});

test('setLocale switches the table', () => {
  setLocale('es');

  expect(getLocale()).toBe('es');
  expect(getStrings()).toBe(es);
});

test('setLocale resolves a locale that carries a region', () => {
  setLocale('es-MX');

  expect(getLocale()).toBe('es');
  expect(getStrings()).toBe(es);
});

test('setLocale ignores a locale with no bundled table', () => {
  setLocale('ja');

  expect(getLocale()).toBe('en');
  expect(getStrings()).toBe(en);
});

test('every locale table covers the English key set', () => {
  const keys = Object.keys(en).sort();

  for (const locale of ['es', 'fr', 'gx']) {
    setLocale(locale);
    expect(Object.keys(getStrings()).sort()).toEqual(keys);
  }
});

test('useStrings renders the current table', () => {
  const Label = () => <span>{useStrings().CANCEL}</span>;

  render(<Label />);

  expect(screen.getByText('Cancel')).toBeInTheDocument();
});

test('useStrings re-renders a mounted component when the locale changes', () => {
  const Label = () => <span>{useStrings().CANCEL}</span>;

  render(<Label />);
  act(() => setLocale('es'));

  expect(screen.getByText('Cancelar')).toBeInTheDocument();
});
