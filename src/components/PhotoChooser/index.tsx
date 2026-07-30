import React, { type JSX, useEffect, useRef, useState } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { useDeviceInfo } from '../../utils';
import Button from '../Button/Button';
import ErrorBox from '../ErrorBox/ErrorBox';
import FileChooser from '../FileChooser';

export type PhotoChooserErrorType = {
  title: string;
  text: string;
};

export type PhotoChooserProps = {
  title?: string;
  description?: string | string[];
  onPhotosChanged: (photos: File[]) => void;
  multipleSelection?: boolean;
  error?: PhotoChooserErrorType;
  selectedFile?: any;
  uploadText?: string;
  uploadDescription?: string;
  uploadMobileDescription?: string;
  photoSelectedText?: string;
  chooseFileText?: string;
  replaceFileText?: string;
  maxPhotos?: number;
  existingPhotos?: string[];
  onExistingPhotoRemoved?: (index: number) => void;
  existingImagesLabel?: string;
  newImagesLabel?: string;
};

export default function PhotoChooser(props: PhotoChooserProps): JSX.Element {
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
    maxPhotos,
    existingPhotos,
    onExistingPhotoRemoved,
    existingImagesLabel,
    newImagesLabel,
  } = props;
  const { isMobile } = useDeviceInfo();
  const [files, setFiles] = useState<File[]>([]);
  const [filesData, setFilesData] = useState<string[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const removeFileAtIndex = (index: number) => {
    const filesList = [...files];
    filesList.splice(index, 1);
    setFiles(filesList);
  };

  const onChoosingFiles = () => {
    divRef.current?.focus();
  };

  useEffect(() => {
    const filesDataList = files.map((file) => URL.createObjectURL(file));

    setFilesData(filesDataList);
    onPhotosChanged(files);

    return () => {
      // we need to clean this up to avoid a memory leak
      filesDataList.forEach((fileData) => URL.revokeObjectURL(fileData));
    };
  }, [files]);

  const renderThumbnail = ({
    src,
    alt,
    onRemove,
    id,
  }: {
    src: string;
    alt?: string;
    onRemove?: () => void;
    id?: string;
  }) => (
    <Box
      key={id ?? src}
      position='relative'
      height={122}
      width={122}
      marginRight={isMobile ? theme.spacing(2) : theme.spacing(3)}
      marginTop={theme.spacing(1)}
      border={`1px solid ${theme.palette.TwClrBrdrTertiary}`}
    >
      {onRemove && (
        <Button
          icon='iconTrashCan'
          id={id}
          onClick={onRemove}
          size='small'
          style={{
            position: 'absolute',
            top: -10,
            right: -10,
            backgroundColor: theme.palette.TwClrBgDanger,
          }}
        />
      )}
      <img
        height='120px'
        src={src}
        alt={alt}
        style={{
          margin: 'auto auto',
          objectFit: 'contain',
          display: 'flex',
          maxWidth: '120px',
          maxHeight: '120px',
        }}
      />
    </Box>
  );

  return (
    <Box
      ref={divRef}
      tabIndex={0}
      sx={{
        backgroundColor: theme.palette.TwClrBg,
        borderRadius: theme.spacing(4),
        padding: theme.spacing(3),
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
        {error && (
          <ErrorBox
            title={error.title}
            text={error.text}
            sx={{
              width: 'auto',
              marginBottom: theme.spacing(2),
              '&.mobile': {
                width: 'auto',
              },
            }}
          />
        )}
        {existingPhotos && existingPhotos.length > 0 && (
          <Box marginBottom={theme.spacing(2)}>
            {existingImagesLabel && (
              <Typography fontSize={14} fontWeight={400} marginBottom={theme.spacing(1)}>
                {existingImagesLabel}
              </Typography>
            )}
            <Box display='flex' flexDirection='row' flexWrap='wrap'>
              {existingPhotos.map((url, index) =>
                renderThumbnail({
                  src: url,
                  alt: url,
                  id: `existing-photo-remove-${index}`,
                  onRemove: onExistingPhotoRemoved ? () => onExistingPhotoRemoved(index) : undefined,
                })
              )}
            </Box>
          </Box>
        )}
        {filesData.length > 0 && multipleSelection && (
          <Box marginBottom={theme.spacing(2)}>
            {newImagesLabel && (
              <Typography fontSize={14} fontWeight={400} marginBottom={theme.spacing(1)}>
                {newImagesLabel}
              </Typography>
            )}
            <Box display='flex' flexDirection='row' flexWrap='wrap'>
              {filesData.map((fileData, index) =>
                renderThumbnail({
                  src: fileData,
                  alt: files[index]?.name,
                  onRemove: () => removeFileAtIndex(index),
                })
              )}
            </Box>
          </Box>
        )}
      </Box>
      <FileChooser
        acceptFileType='image/jpeg,image/png'
        chooseFileText={chooseFileText}
        files={files}
        fileSelectedText={photoSelectedText}
        iconName='blobbyGrayIconImage'
        maxFiles={maxPhotos}
        multipleSelection={multipleSelection}
        onChoosingFiles={onChoosingFiles}
        replaceFileText={replaceFileText}
        selectedFile={selectedFile}
        setFiles={setFiles}
        uploadDescription={uploadDescription}
        uploadMobileDescription={uploadMobileDescription}
        uploadText={uploadText}
      />
    </Box>
  );
}
