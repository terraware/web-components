import React, { type JSX, type ReactNode } from 'react';

import {
  Box,
  Stepper as MuiStepper,
  Step,
  StepContent,
  StepLabel,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';

import { useStrings } from '../../strings';

export type StepperStep = {
  /**
   * Shown below the step label in horizontal steppers, and below both the step icon and label in vertical ones. Strings
   * get the default caption styling; elements are rendered as-is.
   */
  description?: ReactNode;
  label: ReactNode;
  /**
   * Marks the step as optional. Whether an optional step shows as completed comes from `completed` here rather than
   * from `completedSteps` or the active step, since the user may have skipped it.
   */
  optional?: { completed: boolean };
};

export type StepperProps = {
  activeStep: number;
  /** Shows every step's description instead of only the active step's. */
  alwaysShowDescriptions?: boolean;
  className?: string;
  /**
   * Indexes of the steps that are completed. When provided, only these steps show as completed, so a step stays
   * completed when the user goes back to an earlier one. The active step always uses the active styling, even if it is
   * in this list. When omitted, every step before the active one shows as completed.
   */
  completedSteps?: number[];
  /** Whether the "Optional" text for optional steps goes below the step label or beside it. Defaults to below. */
  optionalPlacement?: 'below' | 'inline';
  /** Defaults to horizontal. */
  orientation?: 'horizontal' | 'vertical';
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

const Stepper = ({
  activeStep,
  alwaysShowDescriptions = false,
  className,
  completedSteps,
  optionalPlacement = 'below',
  orientation = 'horizontal',
  stepLabelSx,
  steps,
  sx,
}: StepperProps): JSX.Element => {
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

  const renderCaption = (content: ReactNode) => (
    <Typography variant='caption' color={theme.palette.TwClrTxtSecondary as string}>
      {content}
    </Typography>
  );

  const renderDescription = (description: ReactNode): ReactNode =>
    typeof description === 'string' ? renderCaption(description) : description;

  const renderBelowLabel = (step: StepperStep, index: number): ReactNode => {
    const showOptional = step.optional && optionalPlacement === 'below';
    const showDescription =
      step.description && orientation === 'horizontal' && (alwaysShowDescriptions || index === activeStep);
    if (!showOptional && !showDescription) {
      return undefined;
    }

    return (
      <Box display='flex' flexDirection='column'>
        {showOptional && renderCaption(strings.OPTIONAL)}
        {showDescription && renderDescription(step.description)}
      </Box>
    );
  };

  const renderLabel = (step: StepperStep): ReactNode =>
    step.optional && optionalPlacement === 'inline' ? (
      <Box component='span' display='inline-flex' alignItems='baseline' gap={1}>
        <span>{step.label}</span>
        {renderCaption(strings.OPTIONAL)}
      </Box>
    ) : (
      step.label
    );

  return (
    <MuiStepper
      activeStep={activeStep}
      className={className}
      orientation={orientation}
      sx={[{ margin: theme.spacing(1, 0, 1) }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {steps.map((stepOrLabel, index) => {
        const step = typeof stepOrLabel === 'string' ? { label: stepOrLabel } : stepOrLabel;

        return (
          <Step key={index} completed={isCompleted(step, index)} expanded={alwaysShowDescriptions}>
            <StepLabel optional={renderBelowLabel(step, index)} sx={getStepLabelStyles(index)}>
              {renderLabel(step)}
            </StepLabel>
            {orientation === 'vertical' && step.description && (
              <StepContent sx={{ margin: 0, padding: 0, border: 'none' }}>
                {renderDescription(step.description)}
              </StepContent>
            )}
          </Step>
        );
      })}
    </MuiStepper>
  );
};

export default Stepper;
