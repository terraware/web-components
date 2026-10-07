import React from 'react';

import { render, screen } from '@testing-library/react';

import Stepper from '.';

const steps = ['One', 'Two', 'Three'];

const isCompleted = (label: string) => screen.getByText(label).classList.contains('Mui-completed');

test('marks steps before the active step as completed by default', () => {
  render(<Stepper activeStep={2} steps={steps} />);

  expect(isCompleted('One')).toBe(true);
  expect(isCompleted('Two')).toBe(true);
  expect(isCompleted('Three')).toBe(false);
});

test('keeps completed steps completed after going back to an earlier step', () => {
  render(<Stepper activeStep={0} completedSteps={[0, 1]} steps={steps} />);

  expect(isCompleted('Two')).toBe(true);
  expect(isCompleted('Three')).toBe(false);
});

test('shows the active step as active even if it was previously completed', () => {
  render(<Stepper activeStep={0} completedSteps={[0, 1]} steps={steps} />);

  expect(isCompleted('One')).toBe(false);
  expect(screen.getByText('One').classList.contains('Mui-active')).toBe(true);
});

test('only marks the given steps as completed when completedSteps is provided', () => {
  render(<Stepper activeStep={2} completedSteps={[1]} steps={steps} />);

  expect(isCompleted('One')).toBe(false);
  expect(isCompleted('Two')).toBe(true);
});

test('accepts step objects and labels optional steps', () => {
  render(<Stepper activeStep={0} steps={['One', { label: 'Two', optional: { completed: false } }]} />);

  expect(screen.getByText('Two')).toBeInTheDocument();
  expect(screen.getAllByText('Optional')).toHaveLength(1);
});

test('uses the optional step completion status instead of its position', () => {
  render(
    <Stepper
      activeStep={2}
      completedSteps={[0, 1]}
      steps={[
        { label: 'One', optional: { completed: false } },
        'Two',
        { label: 'Three', optional: { completed: true } },
      ]}
    />
  );

  expect(isCompleted('One')).toBe(false);
  expect(isCompleted('Two')).toBe(true);
  expect(isCompleted('Three')).toBe(false);
});
