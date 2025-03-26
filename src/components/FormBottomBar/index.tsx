import React from 'react';
import { AppBar, Box, useTheme } from '@mui/material';
import Button from '../Button/Button';
import useDeviceInfo from '../../utils/useDeviceInfo';

const defaultDesktopOffset = '200px';

export interface FormButton {
  id: string;
  text: string;
  disabled: boolean;
  onClick: () => void;
  buttonPriority?: 'primary' | 'secondary';
  buttonType?: 'passive' | 'productive' | 'destructive';
}

export interface Props {
  cancelID: string;
  saveID: string;
  onCancel: () => void;
  cancelButtonText?: string;
  saveButtonText: string;
  saveDisabled?: boolean;
  onSave: () => void;
  additionalRightButtons?: FormButton[];
  desktopOffset?: string;
}

export default function FormBottomBar({
  cancelID,
  saveID,
  onCancel,
  cancelButtonText,
  saveButtonText,
  saveDisabled,
  onSave,
  additionalRightButtons,
  desktopOffset,
}: Props): JSX.Element {
  const { isMobile, isDesktop } = useDeviceInfo();
  const theme = useTheme();

  return (
    <AppBar
      position='fixed'
      color='primary'
      style={{ top: 'auto', bottom: 0, right: 'auto', left: isDesktop ? 'auto' : 0 }}
      sx={{
        background:
          `linear-gradient(to right, ${theme.palette.TwClrBaseGray025}00,` +
          `${theme.palette.TwClrBaseGray025}80, ${theme.palette.TwClrBaseGray025}80,` +
          `${theme.palette.TwClrBaseGray025}00)`,
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid',
        borderImage:
          `linear-gradient(to right, ${theme.palette.TwClrBaseGray300}00,` +
          `${theme.palette.TwClrBaseGray300}FF, ${theme.palette.TwClrBaseGray300}FF,` +
          `${theme.palette.TwClrBaseGray300}FF, ${theme.palette.TwClrBaseGray300}00) 1`,
        boxShadow: 'none',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse' : 'row',
        padding: isDesktop ? '16px 24px' : `16px 24px ${theme.spacing(5)}`,
        width: isDesktop ? `calc(100% - ${desktopOffset || defaultDesktopOffset})` : '100%',
        zIndex: 1000,
      }}
    >
      <Button
        id={cancelID || 'cancelBottomBar'}
        size='medium'
        label={cancelButtonText}
        onClick={onCancel}
        priority='secondary'
        type='passive'
        style={{
          marginTop: isMobile ? theme.spacing(1) : 'auto',
          marginRight: theme.spacing(1),
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column-reverse' : 'row',
        }}
      >
        {additionalRightButtons &&
          additionalRightButtons.map((btn) => (
            <Button
              id={btn.id}
              key={btn.id}
              priority={btn.buttonPriority}
              type={btn.buttonType}
              size='medium'
              label={btn.text}
              onClick={btn.onClick}
              disabled={btn.disabled}
              style={{
                marginTop: isMobile ? theme.spacing(1) : 'auto',
              }}
            />
          ))}
        <Button
          id={saveID || 'saveBottomBar'}
          size='medium'
          label={saveButtonText}
          onClick={onSave}
          disabled={saveDisabled}
          style={{
            marginTop: isMobile ? theme.spacing(1) : 'auto',
          }}
        />
      </Box>
    </AppBar>
  );
}
