import { makeStyles } from '@mui/styles';
import React, { ReactNode } from 'react';

import './styles.scss';
import Icon from '../Icon/Icon';
import { useDeviceInfo } from '../../utils';
import { Theme } from '@mui/material';

export interface Props {
  children: ReactNode;
  setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>;
  backgroundTransparent?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    fill: theme.palette.TwClrIcnSecondary,
    marginRight: '16px',
    marginBottom: '8px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  navBarTop: {
    display: 'flex',
    justifyContent: 'start',
  },
}));

export default function Navbar(props: Props): JSX.Element {
  const { children, setShowNavBar, backgroundTransparent } = props;
  const { isDesktop } = useDeviceInfo();
  const classes = useStyles();

  return (
    <div className={'navbar' + (backgroundTransparent ? ' transparent' : '')}>
      {!isDesktop && (
        <div className={classes.navBarTop}>
          <button onClick={() => setShowNavBar(false)} className={classes.closeButton}>
            <Icon name='close' size='medium' className={classes.icon} />
          </button>
        </div>
      )}
      {children}
    </div>
  );
}
