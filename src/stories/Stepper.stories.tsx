import React, { useState } from 'react';

import { Box, Typography, useTheme } from '@mui/material';
import { Story } from '@storybook/react';

import Button from '../components/Button/Button';
import Icon from '../components/Icon/Icon';
import IconTooltip from '../components/IconTooltip';
import Stepper, { StepperProps, StepperStep } from '../components/Stepper';

export default {
  title: 'Stepper',
  component: Stepper,
};

const steps = ['Purpose', 'Quantities', 'Photos'];

const siteBoundaryLabel = (
  <>
    Site Boundary
    <IconTooltip title='The site boundary is the outer edge of your planting site. It should include every area you plan to plant.' />
  </>
);

const stepsWithOptional: (string | StepperStep)[] = [
  'Details',
  { label: siteBoundaryLabel },
  { label: 'Exclusion Areas', optional: { completed: false } },
  { label: 'Strata', optional: { completed: true } },
  'Review',
];

const LongDescription = () => {
  const theme = useTheme();

  return (
    <Box display='flex' flexDirection='column' gap={3} marginTop={2} maxWidth='480px'>
      <Typography fontSize='16px' lineHeight='24px' color={theme.palette.TwClrTxt as string}>
        Draw the site boundary of your planting site below. All plantable areas within your project must be contained
        within the site boundary.
      </Typography>
      <Box display='flex' alignItems='flex-start' gap={3}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexShrink={0}
          width='32px'
          height='32px'
          borderRadius='4px'
          sx={{
            backgroundColor: theme.palette.TwClrBg as string,
            boxShadow: `0 2px 4px ${theme.palette.TwClrShdw as string}`,
          }}
        >
          <Icon name='iconEdit' fillColor={theme.palette.TwClrIcn as string} />
        </Box>
        <Typography fontSize='16px' lineHeight='24px' color={theme.palette.TwClrTxt as string}>
          Use the drawing tool to draw the boundary of the planting site. about drawing site boundaries.
        </Typography>
      </Box>
      <Typography fontSize='16px' fontWeight={600} lineHeight='24px' color={theme.palette.TwClrTxt as string}>
        The site boundary should fit in a bounding box of less than or equal to 20,000 hectares. If it is larger,
        consider splitting the site into multiple planting sites.
      </Typography>
    </Box>
  );
};

const stepsWithDescriptions: StepperStep[] = [
  { label: 'Details', description: 'Name and location' },
  { label: siteBoundaryLabel, description: <LongDescription /> },
  { label: 'Exclusion Areas', optional: { completed: false }, description: 'Areas that will not be planted' },
  {
    label: 'Review',
    description: 'Finish up the process.',
  },
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

export const OptionalInline = Template.bind({});

OptionalInline.args = {
  activeStep: 4,
  optionalPlacement: 'inline',
  steps: stepsWithOptional,
};

export const Vertical = Template.bind({});

Vertical.args = {
  activeStep: 1,
  orientation: 'vertical',
  steps: stepsWithOptional,
};

export const WithDescriptions = Template.bind({});

WithDescriptions.args = {
  activeStep: 1,
  alwaysShowDescriptions: true,
  steps: stepsWithDescriptions,
};

export const VerticalWithDescriptions = Template.bind({});

VerticalWithDescriptions.args = {
  activeStep: 1,
  alwaysShowDescriptions: true,
  optionalPlacement: 'inline',
  orientation: 'vertical',
  steps: stepsWithDescriptions,
};

export const VerticalActiveDescriptionOnly = InteractiveTemplate.bind({});

VerticalActiveDescriptionOnly.args = {
  orientation: 'vertical',
  steps: stepsWithDescriptions,
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
