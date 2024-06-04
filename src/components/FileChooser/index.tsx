import React, { useEffect, useRef, useState } from 'react';
import { Box, Link, Typography, useTheme } from '@mui/material';

import { useDeviceInfo } from '../../utils';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';

export type FileTemplate = {
  text: string;
  url: string;
};

export type FileChooserProps = {
  /** Optional comma-separated list of MIME types to accept in the chooser. */
  acceptFileType?: string;
  chooseFileText?: string;
  files?: File[];
  fileSelectedText?: string;
  iconName?: IconName;
  maxFiles?: number;
  multipleSelection?: boolean;
  onChoosingFiles?: () => void;
  replaceFileText?: string;
  selectedFile?: any;
  setFiles: (files: File[]) => void;
  template?: FileTemplate;
  uploadDescription?: string;
  uploadMobileDescription?: string;
  uploadText?: string;
};

export default function FileChooser(props: FileChooserProps): JSX.Element {
  const {
    acceptFileType,
    chooseFileText,
    files,
    fileSelectedText,
    iconName,
    maxFiles,
    multipleSelection,
    onChoosingFiles,
    replaceFileText,
    selectedFile,
    setFiles,
    template,
    uploadDescription,
    uploadMobileDescription,
    uploadText,
  } = props;
  const { isMobile } = useDeviceInfo();
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    setEditing(!!selectedFile);
  }, [selectedFile]);

  const addFiles = (fileList: FileList) => {
    const newFiles: File[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const fileItem = fileList.item(i);
      if (fileItem) {
        newFiles.push(fileItem);
      }
    }

    if (newFiles.length) {
      setFiles([...(files ?? []), ...newFiles].slice(0, maxFiles));
    }
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  };

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onChooseFileHandler = () => {
    inputRef.current?.click();
    onChoosingFiles?.();
  };

  const onFileChosen = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editing) {
      setEditing(false);
    }
    if (event.currentTarget.files) {
      addFiles(event.currentTarget.files);
    }
  };

  return (
    <Box
      onDrop={dropHandler}
      onDragOver={enableDropping}
      border={`1px dashed ${theme.palette.TwClrBrdrTertiary}`}
      borderRadius={theme.spacing(2)}
      display='flex'
      flexDirection='column'
      alignItems='center'
      padding={theme.spacing(3)}
      sx={{ background: theme.palette.TwClrBg }}
    >
      {iconName && (
        <Icon
          name={iconName}
          size='xlarge'
          style={{
            height: '120px',
            width: '120px',
          }}
        />
      )}
      <Typography color={theme.palette.TwClrTxt} fontSize={14} fontWeight={600} margin={theme.spacing(0, 0, 1)}>
        {!editing && ((files || []).length > 0 && !multipleSelection ? files?.[0].name : uploadText)}
      </Typography>
      <Typography color={theme.palette.TwClrTxt} fontSize={12} fontWeight={400} margin={0}>
        {(editing || (files || []).length > 0) && !multipleSelection
          ? fileSelectedText
          : isMobile && uploadMobileDescription
          ? uploadMobileDescription
          : uploadDescription}
      </Typography>
      <input
        type='file'
        ref={inputRef}
        onChange={onFileChosen}
        accept={acceptFileType}
        multiple={multipleSelection || false}
        value={''}
        style={{ display: 'none' }}
      />
      <Button
        onClick={onChooseFileHandler}
        disabled={maxFiles !== undefined ? (files || []).length >= maxFiles : false}
        label={!multipleSelection && ((files || []).length === 1 || editing) ? replaceFileText : chooseFileText}
        priority='secondary'
        type='passive'
        sx={{ marginTop: theme.spacing(3) }}
      />
      {template && (
        <Link
          href={template.url}
          target='_blank'
          sx={{
            color: theme.palette.TwClrTxtBrand,
            fontFamily: 'Inter',
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: '16px',
            marginTop: theme.spacing(2),
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {template.text}
        </Link>
      )}
    </Box>
  );
}
