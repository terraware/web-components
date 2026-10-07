import React, { type JSX } from 'react';

import { Stepper as MuiStepper, Step, StepLabel, SxProps, Theme, Typography, useTheme } from '@mui/material';

import { useStrings } from '../../strings';

export type StepperStep = {
  label: string;
  /**
   * Marks the step as optional. Whether an optional step shows as completed comes from `completed` here rather than
   * from `completedSteps` or the active step, since the user may have skipped it.
   */
  optional?: { completed: boolean };
};

export type StepperProps = {
  activeStep: number;
  className?: string;
  /**
   * Indexes of the steps that are completed. When provided, only these steps show as completed, so a step stays
   * completed when the user goes back to an earlier one. The active step always uses the active styling, even if it is
   * in this list. When omitted, every step before the active one shows as completed.
   */
  completedSteps?: number[];
  /**
   * Styles applied to each step label, after the defaults. MUI styles active and completed labels with a more specific
   * selector, so label text overrides should target `.MuiStepLabel-label.Mui-active` and
   * `.MuiStepLabel-label.Mui-completed` as well as `.MuiStepLabel-label`.
   */
  stepLabelSx?: SxProps<Theme>;
  steps: (string | StepperStep)[];
  sx?: SxProps<Theme>;
};

const LABEL_SELECTOR = '.MuiStepLabel-label, .MuiStepLabel-label.Mui-active, .MuiStepLabel-label.Mui-completed';

const Stepper = ({ activeStep, className, completedSteps, stepLabelSx, steps, sx }: StepperProps): JSX.Element => {
  const theme = useTheme();
  const strings = useStrings();

  const isCompleted = (step: StepperStep, index: number): boolean | undefined => {
    if (index === activeStep) {
      return false;
    }
    if (step.optional) {
      return step.optional.completed;
    }
    return completedSteps ? completedSteps.includes(index) : undefined;
  };

  const getStepLabelStyles = (index: number): SxProps<Theme> => [
    {
      '.MuiStepIcon-root': { fill: theme.palette.TwClrBgTertiary as string },
      '.MuiStepIcon-root.Mui-active': { fill: theme.palette.TwClrIcnSecondary as string },
      '.MuiStepIcon-root.Mui-completed': { fill: theme.palette.TwClrTxtBrand as string },
      [LABEL_SELECTOR]: {
        fontSize: '14px',
        fontWeight: 400,
        color: (index === activeStep ? theme.palette.TwClrTxt : theme.palette.TwClrTxtSecondary) as string,
      },
    },
    ...(Array.isArray(stepLabelSx) ? stepLabelSx : [stepLabelSx]),
  ];

  return (
    <MuiStepper
      activeStep={activeStep}
      className={className}
      sx={[{ margin: theme.spacing(1, 0, 3) }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {steps.map((stepOrLabel, index) => {
        const step = typeof stepOrLabel === 'string' ? { label: stepOrLabel } : stepOrLabel;

        return (
          <Step key={index} completed={isCompleted(step, index)}>
            <StepLabel
              optional={
                step.optional && (
                  <Typography variant='caption' color={theme.palette.TwClrTxtSecondary as string}>
                    {strings.OPTIONAL}
                  </Typography>
                )
              }
              sx={getStepLabelStyles(index)}
            >
              {step.label}
            </StepLabel>
          </Step>
        );
      })}
    </MuiStepper>
  );
};

export default Stepper;
