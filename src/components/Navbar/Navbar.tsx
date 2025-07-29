import React, { ReactNode } from 'react';

import { Box, ButtonBase, useTheme } from '@mui/material';

import { useDeviceInfo } from '../../utils';
import Icon from '../Icon/Icon';
import './styles.scss';

export interface Props {
  children: ReactNode;
  setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>;
  backgroundTransparent?: boolean;
}

export default function Navbar(props: Props): JSX.Element {
  const { children, setShowNavBar, backgroundTransparent } = props;
  const { isDesktop } = useDeviceInfo();
  const theme = useTheme();

  return (
    <div className={'navbar' + (backgroundTransparent ? ' transparent' : '')}>
      {!isDesktop && (
        <Box sx={{ display: 'flex', justifyContent: 'start' }}>
          <ButtonBase
            onClick={() => setShowNavBar(false)}
            sx={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Icon
              name='close'
              size='medium'
              style={{
                fill: theme.palette.TwClrIcnSecondary,
                marginRight: '16px',
                marginBottom: '8px',
              }}
            />
          </ButtonBase>
        </Box>
      )}
      {children}
    </div>
  );
}
