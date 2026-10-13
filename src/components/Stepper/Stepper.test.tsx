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

test('shows the optional text beside the step label when optionalPlacement is inline', () => {
  const { container } = render(
    <Stepper
      activeStep={0}
      optionalPlacement='inline'
      steps={['One', { label: 'Two', optional: { completed: false } }]}
    />
  );

  const labels = container.querySelectorAll('.MuiStepLabel-label');
  expect(labels[1]).toHaveTextContent('TwoOptional');
  expect(screen.getAllByText('Optional')).toHaveLength(1);
});

test('shows the optional text below the step label by default', () => {
  const { container } = render(
    <Stepper activeStep={0} steps={['One', { label: 'Two', optional: { completed: false } }]} />
  );

  const labels = container.querySelectorAll('.MuiStepLabel-label');
  expect(labels[1]).toHaveTextContent(/^Two$/);
  expect(screen.getByText('Optional')).toBeInTheDocument();
});

test('renders a vertical stepper', () => {
  const { container } = render(<Stepper activeStep={0} orientation='vertical' steps={steps} />);

  expect(container.querySelector('.MuiStepper-vertical')).toBeInTheDocument();
});

test('renders string and element step descriptions', () => {
  render(
    <Stepper
      activeStep={0}
      alwaysShowDescriptions
      steps={[
        { label: 'One', description: 'First description' },
        { label: 'Two', description: <a href='#two'>Second description</a> },
      ]}
    />
  );

  expect(screen.getByText('First description')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Second description' })).toBeInTheDocument();
});

test('renders descriptions below the step icon and label in a vertical stepper', () => {
  const { container } = render(
    <Stepper
      activeStep={0}
      alwaysShowDescriptions
      orientation='vertical'
      steps={[
        { label: 'One', description: 'First description' },
        { label: 'Two', description: 'Second description' },
      ]}
    />
  );

  const contents = container.querySelectorAll('.MuiStepContent-root');
  expect(contents).toHaveLength(2);
  expect(contents[1]).toHaveTextContent('Second description');
  expect(container.querySelector('.MuiStepLabel-labelContainer')).not.toHaveTextContent('First description');
});

test.each(['horizontal', 'vertical'] as const)(
  'only shows the active step description by default in a %s stepper',
  (orientation) => {
    render(
      <Stepper
        activeStep={1}
        orientation={orientation}
        steps={[
          { label: 'One', description: 'First description' },
          { label: 'Two', description: 'Second description' },
        ]}
      />
    );

    expect(screen.queryByText('First description')).not.toBeInTheDocument();
    expect(screen.getByText('Second description')).toBeInTheDocument();
  }
);

test('renders element step labels', () => {
  render(
    <Stepper
      activeStep={0}
      steps={[
        'One',
        {
          label: (
            <>
              Two <button>info</button>
            </>
          ),
        },
      ]}
    />
  );

  expect(screen.getByRole('button', { name: 'info' })).toBeInTheDocument();
});
