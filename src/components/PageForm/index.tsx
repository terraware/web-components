import React, { CSSProperties, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import useDeviceInfo from '../../utils/useDeviceInfo';
import FormBottomBar, { FormButton } from '../FormBottomBar';
import BusySpinner from '../BusySpinner';

export type PageFormProps = {
  children: React.ReactNode;
  cancelID: string;
  saveID: string;
  onCancel: () => void;
  onSave: () => void;
  cancelButtonText: string;
  saveButtonText: string;
  saveDisabled?: boolean;
  className?: string;
  hideEdit?: boolean;
  additionalRightButtons?: FormButton[];
  style?: CSSProperties;
};

export default function PageForm(props: PageFormProps): JSX.Element {
  const { children, className, hideEdit, onSave, style, ...bottomBarProps } = props;
  const theme = useTheme();
  const { isMobile } = useDeviceInfo();
  const [processing, setProcessing] = useState(false);

  const handleSave = async () => {
    setProcessing(true);
    await onSave(); // <-- we want all onSaves to be async
    setProcessing(false);
  };

  return (
    <>
      {processing && <BusySpinner withSkrim={true} />}
      <Box
        className={className}
        paddingBottom={hideEdit ? theme.spacing(4) : theme.spacing(isMobile ? 25 : 15)}
        style={style}
      >
        {children}
      </Box>
      {!hideEdit && <FormBottomBar onSave={handleSave} {...bottomBarProps} />}
    </>
  );
}
