import React, { useMemo } from 'react';
import { Typography, useTheme } from '@mui/material';
import DialogBox, { DialogBoxSize } from '../DialogBox/DialogBox';
import Button, { ButtonPriority, ButtonType } from '../Button/Button';
import { IconName } from '../Icon/icons';

/**
 * A generic confirm modal built on top of DialogBox.
 * Most properties are optional with default values.
 * Required properties are commented as such.
 */
export type ConfirmProps = {
  confirmButtonDisabled?: boolean; // optional disabled state for confirm button
  confirmButtonIcon?: IconName; // optional icon for confirm button
  confirmButtonId?: string; // defaults to 'confirm-submit'
  confirmButtonPriority?: ButtonPriority; // defaults to 'primary'
  confirmButtonText: string; // required, text of confirm button
  confirmButtonType?: ButtonType; // defaults to 'productive'
  closeButtonId?: string; // defaults to 'confirm-close'
  closeButtonText?: string; // absence of close text will hide the close button
  message: string | string[] | React.ReactNode; // required, the message content
  onClose?: () => void; // absence of onClose will hide the close button
  onConfirm: () => void; // required, callback on confirm button
  open?: boolean; // defaults to true, whether confirm modal is open
  size?: DialogBoxSize; // optional defaults to 'medium'
  skrim?: boolean; // whether to show a blurred backdrop for the dialog
  textStyle?: Record<string, any>; // option style override for message text
  title: string; // required, title of confirm modal
};

export default function Confirm({
  confirmButtonDisabled,
  confirmButtonIcon,
  confirmButtonId,
  confirmButtonPriority,
  confirmButtonText,
  confirmButtonType,
  closeButtonId,
  closeButtonText,
  message,
  onClose,
  onConfirm,
  open,
  size,
  skrim,
  textStyle,
  title,
}: ConfirmProps): JSX.Element {
  const theme = useTheme();

  const middleButtons = useMemo(() => {
    const buttons = [
      <Button
        disabled={confirmButtonDisabled}
        icon={confirmButtonIcon}
        id={confirmButtonId || 'confirm-submit'}
        key='button-2'
        label={confirmButtonText}
        onClick={onConfirm}
        priority={confirmButtonPriority || 'primary'}
        type={confirmButtonType || 'productive'}
      />
    ];

    if (onClose && closeButtonText) {
      buttons.unshift(
        <Button
          id={closeButtonId || 'confirm-close'}
          key='button-1'
          label={closeButtonText}
          onClick={onClose}
          priority='secondary'
          type='passive'
        />,
      );
    }

    return buttons;
  }, [
    confirmButtonDisabled,
    confirmButtonIcon,
    confirmButtonId,
    confirmButtonPriority,
    confirmButtonText,
    confirmButtonType,
    closeButtonId,
    closeButtonText,
    onClose,
    onConfirm,
  ]);

  const content = useMemo(() => {
    const text = (str: string, key?: string) => {
      return (
        <Typography
          color={theme.palette.TwClrTxt}
          fontSize='16px'
          fontWeight={400}
          key={key}
          lineHeight='24px'
          textAlign='center'
          sx={{
            marginBottom: theme.spacing(1),
            '&:last-child': {
              marginBottom: 0,
            },
            ...(textStyle || {})
          }}
        >{str}</Typography>
      );
    };
    if (typeof message === 'string') {
      return text(message);
    } else if (Array.isArray(message)) {
      return (
        <>
          {message.map((str, i) => text(str, `${str}_${i}`))}
        </>
      );
    } else {
      return message;
    }
  }, [message, textStyle, theme]);

  return (
    <DialogBox
      onClose={onClose}
      open={open ?? true}
      title={title}
      size={size || 'medium'}
      skrim={skrim}
      middleButtons={middleButtons}
    >
      {content}
    </DialogBox>
  );
}
