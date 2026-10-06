import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import Button from './Button';

test('calls onClick prop when clicked', () => {
  const handleClick = rstest.fn();
  render(<Button onClick={handleClick} label='Click me' />);
  fireEvent.click(screen.getByText(/click me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('should not call onClick prop when button is disabled', () => {
  const handleClick = rstest.fn();
  render(<Button onClick={handleClick} label='Click me' disabled={true} />);
  fireEvent.click(screen.getByText(/click me/i));
  expect(handleClick).toHaveBeenCalledTimes(0);
});
