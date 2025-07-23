import React, { CSSProperties, ReactNode } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import Icon from '../Icon/Icon';
import './styles.scss';

type MapDrawerSize = 'small' | 'medium';

export type MapDrawerProp = {
  children?: ReactNode;
  onClose?: () => void;
  open: boolean;
  size: MapDrawerSize;
  style?: CSSProperties;
  title: string;
};

const MapDrawer = (props: MapDrawerProp) => {
  const { children, onClose, open, size, style, title } = props;
  const theme = useTheme();

  return open ? (
    <Box className={`map-drawer map-drawer--${size}`} border={`1px solid ${theme.palette.TwClrBrdrTertiary}`} style={style}>
      <Box className='map-drawer--header'>
        <p className='title'>{title}</p>
        <IconButton onClick={onClose} size='small'>
          <Icon name='close' className='icon-close' />
        </IconButton>
      </Box>
      <Box
        className={'map-drawer--body'}
      >
        {children}
      </Box>
    </Box>
  ) : null;
};

export default MapDrawer;