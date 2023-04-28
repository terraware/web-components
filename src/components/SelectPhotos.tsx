import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDeviceInfo } from '../utils';
import ErrorBox from './ErrorBox/ErrorBox';
import Button from './Button/Button';
import Icon from './Icon/Icon';

export type ErrorType = {
  title: string;
  text: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  removePhoto: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: theme.palette.TwClrBgDanger,
  },
  hiddenInput: {
    display: 'none',
  },
  icon: {
    height: '120px',
    width: '120px',
  },
  button: {
    marginTop: theme.spacing(3),
  },
  error: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  thumbnail: {
    margin: 'auto auto',
    objectFit: 'contain',
    display: 'flex',
    maxWidth: '120px',
    maxHeight: '120px',
  },
}));

export type SelectPhotosProps = {
  title?: string;
  description?: string | string[];
  onPhotosChanged: (photos: File[]) => void;
  multipleSelection?: boolean;
  error?: ErrorType;
  selectedFile?: any;
  uploadText?: string;
  uploadDescription?: string;
  uploadMobileDescription?: string;
  photoSelectedText?: string;
  chooseFileText?: string;
  replaceFileText?: string;
};

export default function SelectPhotos(props: SelectPhotosProps): JSX.Element {
  const {
    title,
    description,
    onPhotosChanged,
    multipleSelection,
    error,
    selectedFile,
    uploadText,
    uploadMobileDescription,
    uploadDescription,
    photoSelectedText,
    chooseFileText,
    replaceFileText,
  } = props;
  const { isMobile } = useDeviceInfo();
  const classes = useStyles();
  const [files, setFiles] = useState<File[]>([]);
  const [filesData, setFilesData] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
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
      updateSelection([...files, ...newFiles]);
    }
  };

  const removeFileAtIndex = (index: number) => {
    const filesList = [...files];
    filesList.splice(index, 1);
    updateSelection(filesList);
  };

  const updateSelection = (selected: File[]) => {
    setFiles(selected);
    onPhotosChanged(selected);
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
    divRef.current?.focus();
  };

  const onFileChosen = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editing) {
      setEditing(false);
    }
    if (event.currentTarget.files) {
      addFiles(event.currentTarget.files);
    }
  };

  useEffect(() => {
    const filesDataList = files.map((file) => URL.createObjectURL(file));

    setFilesData(filesDataList);

    return () => {
      // we need to clean this up to avoid a memory leak
      filesDataList.forEach((fileData) => URL.revokeObjectURL(fileData));
    };
  }, [files]);

  return (
    <Box
      ref={divRef}
      tabIndex={0}
      width='100%'
      sx={{
        backgroundColor: theme.palette.TwClrBg,
        borderRadius: theme.spacing(4),
      }}
    >
      <Box>
        {title && (
          <Typography fontSize={20} fontWeight={600}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography fontSize={14} fontWeight={400} marginTop={theme.spacing(1)} marginBottom={theme.spacing(2)}>
            {Array.isArray(description) ? description.map((txt, i) => <div key={i}>{txt}</div>) : description}
          </Typography>
        )}
        {error && <ErrorBox title={error.title} text={error.text} className={classes.error} />}
        {filesData.length > 0 && multipleSelection && (
          <Box display='flex' flexDirection='row' flexWrap='wrap' marginBottom={theme.spacing(2)}>
            {filesData.map((fileData, index) => (
              <Box
                key={index}
                position='relative'
                height={122}
                width={122}
                marginRight={isMobile ? theme.spacing(2) : theme.spacing(3)}
                marginTop={theme.spacing(1)}
                border={`1px solid ${theme.palette.TwClrBrdrTertiary}`}
              >
                <Button icon='iconTrashCan' onClick={() => removeFileAtIndex(index)} size='small' className={classes.removePhoto} />
                <img height='120px' src={fileData} alt={files[index]?.name} className={classes.thumbnail} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
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
        <Icon name='blobbyGrayIconImage' className={classes.icon} size='xlarge' />
        <Typography color={theme.palette.TwClrTxt} fontSize={14} fontWeight={600} margin={theme.spacing(0, 0, 1)}>
          {!editing && (files.length > 0 && !multipleSelection ? files[0].name : uploadText)}
        </Typography>
        <Typography color={theme.palette.TwClrTxt} fontSize={12} fontWeight={400} margin={0}>
          {(editing || files.length > 0) && !multipleSelection
            ? photoSelectedText
            : isMobile && uploadMobileDescription
            ? uploadMobileDescription
            : uploadDescription}
        </Typography>
        <input
          type='file'
          ref={inputRef}
          className={classes.hiddenInput}
          onChange={onFileChosen}
          accept='image/jpeg,image/png'
          multiple={multipleSelection || false}
        />
        <Button
          onClick={onChooseFileHandler}
          label={!multipleSelection && (files.length === 1 || editing) ? replaceFileText : chooseFileText}
          priority='secondary'
          type='passive'
          className={classes.button}
        />
      </Box>
    </Box>
  );
}
