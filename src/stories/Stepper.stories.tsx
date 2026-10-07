import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { Story } from '@storybook/react';

import Button from '../components/Button/Button';
import Stepper, { StepperProps, StepperStep } from '../components/Stepper';

export default {
  title: 'Stepper',
  component: Stepper,
};

const steps = ['Purpose', 'Quantities', 'Photos'];

const stepsWithOptional: (string | StepperStep)[] = [
  'Details',
  'Site Boundary',
  { label: 'Exclusion Areas', optional: { completed: false } },
  { label: 'Strata', optional: { completed: true } },
  'Review',
];

const Template: Story<StepperProps> = (args) => <Stepper {...args} />;

const InteractiveTemplate: Story<StepperProps> = (args) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const lastStep = args.steps.length - 1;
  const isOptional = (index: number) => typeof args.steps[index] !== 'string' && !!args.steps[index]?.optional;

  const interactiveSteps = args.steps.map((step, index) =>
    typeof step === 'string' || !step.optional
      ? step
      : { ...step, optional: { completed: completedSteps.includes(index) } }
  );

  const goNext = () => {
    setCompletedSteps((prev) => (prev.includes(activeStep) ? prev : [...prev, activeStep]));
    setActiveStep((step) => Math.min(step + 1, lastStep));
  };

  const reset = () => {
    setActiveStep(0);
    setCompletedSteps([]);
  };

  return (
    <Box>
      <Stepper {...args} activeStep={activeStep} completedSteps={completedSteps} steps={interactiveSteps} />
      <Typography marginBottom={2}>
        Completing a step and then going back keeps that step marked as completed.
      </Typography>
      <Box display='flex' gap={1}>
        <Button
          label='Back'
          priority='secondary'
          disabled={activeStep === 0}
          onClick={() => setActiveStep((step) => step - 1)}
        />
        <Button
          label={activeStep === lastStep ? 'Finish' : 'Next'}
          disabled={completedSteps.includes(lastStep)}
          onClick={goNext}
        />
        <Button label='Reset' priority='ghost' onClick={reset} />
      </Box>
    </Box>
  );
};

export const Default = Template.bind({});

Default.args = {
  activeStep: 1,
  steps,
};

export const CompletedStepsAfterGoingBack = Template.bind({});

CompletedStepsAfterGoingBack.args = {
  activeStep: 0,
  completedSteps: [0, 1],
  steps,
};

export const OptionalSteps = Template.bind({});

OptionalSteps.args = {
  activeStep: 4,
  steps: stepsWithOptional,
};

export const InteractiveWithOptional = InteractiveTemplate.bind({});

InteractiveWithOptional.args = {
  steps: stepsWithOptional,
};

export const CustomStyling = Template.bind({});

CustomStyling.args = {
  activeStep: 1,
  completedSteps: [0],
  stepLabelSx: {
    '.MuiStepIcon-root.Mui-active': { fill: '#7B1FA2' },
    '.MuiStepIcon-root.Mui-completed': { fill: '#2E7D32' },
    '.MuiStepLabel-label, .MuiStepLabel-label.Mui-active, .MuiStepLabel-label.Mui-completed': {
      fontSize: '16px',
      fontWeight: 600,
    },
  },
  steps,
  sx: { margin: 0, padding: 2, backgroundColor: '#F5F5F5', borderRadius: 2 },
};
