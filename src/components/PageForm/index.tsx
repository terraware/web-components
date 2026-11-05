import React, { CSSProperties, type JSX, useRef, useState } from 'react';

import { Box, useTheme } from '@mui/material';

import useDeviceInfo from '../../utils/useDeviceInfo';
import BusySpinner from '../BusySpinner';
import FormBottomBar, { FormButton } from '../FormBottomBar';

export type PageFormProps = {
  children: React.ReactNode;
  cancelID: string;
  saveID: string;
  onCancel: () => void;
  onSave: () => void | Promise<unknown>;
  cancelButtonText: string;
  saveButtonText: string;
  saveDisabled?: boolean;
  cancelDisabled?: boolean;
  className?: string;
  hideEdit?: boolean;
  additionalRightButtons?: FormButton[];
  style?: CSSProperties;
  desktopOffset?: string;
};

export default function PageForm(props: PageFormProps): JSX.Element {
  const { children, className, hideEdit, onSave, style, ...bottomBarProps } = props;
  const theme = useTheme();
  const { isMobile } = useDeviceInfo();
  const [processing, setProcessing] = useState(false);
  const processingRef = useRef(false);

  const handleSave = async () => {
    if (processingRef.current) {
      return;
    }
    processingRef.current = true;
    setProcessing(true);
    try {
      await onSave();
    } catch (error) {
      console.error(error);
    } finally {
      processingRef.current = false;
      setProcessing(false);
    }
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
      {!hideEdit && (
        <FormBottomBar
          {...bottomBarProps}
          onSave={() => void handleSave()}
          saveDisabled={processing || bottomBarProps.saveDisabled}
          cancelDisabled={processing || bottomBarProps.cancelDisabled}
          additionalRightButtons={bottomBarProps.additionalRightButtons?.map((button) => ({
            ...button,
            disabled: processing || button.disabled,
          }))}
        />
      )}
    </>
  );
}
