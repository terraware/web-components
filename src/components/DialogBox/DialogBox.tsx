import React, { CSSProperties, type JSX, ReactNode } from 'react';

import { IconButton } from '@mui/material';

import { useDeviceInfo } from '../../utils';
import Icon from '../Icon/Icon';
import './styles.scss';

export type DialogBoxSize = 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

export interface Props {
  title: string;
  size: DialogBoxSize;
  message?: string | string[];
  children?: ReactNode;
  leftButton?: ReactNode;
  rightButtons?: JSX.Element[];
  middleButtons?: JSX.Element[];
  onClose?: () => void;
  open: boolean;
  scrolled?: boolean;
  skrim?: boolean;
  style?: CSSProperties;
}

export default function DialogBox(props: Props): JSX.Element | null {
  const {
    title,
    size,
    message,
    children,
    leftButton,
    rightButtons,
    middleButtons,
    onClose,
    open,
    scrolled,
    skrim,
    style,
  } = props;

  const hasFooter = leftButton || rightButtons || middleButtons;

  const { isMobile } = useDeviceInfo();

  return open ? (
    <div
      className={`dialog-box-container${skrim ? '--skrim' : ''} ${open ? 'dialog-box--opened' : 'dialog-box--closed'} ${
        isMobile ? 'mobile' : ''
      }`}
      onClick={(event) => {
        if (event.target instanceof HTMLElement && event.target.classList.contains('dialog-box--opened')) {
          onClose?.();
        }
      }}
      style={style}
    >
      <div className={`dialog-box dialog-box--${size}`}>
        <div className='dialog-box--header'>
          <div className='close-icon-spacer' />
          <p className='title'>{title}</p>
          <IconButton onClick={onClose} size='small'>
            <Icon name='close' className='icon-close' />
          </IconButton>
        </div>
        <div
          className={(hasFooter ? 'dialog-box--body' : 'dialog-box--body-no-footer') + (scrolled ? ' scrolled' : '')}
        >
          <div className='dialog-box--message'>{message}</div>
          <div className='dialog-box--boundary'>{children}</div>
        </div>
        {hasFooter && (
          <div className='dialog-box--footer'>
            {leftButton && (
              <div className='dialog-box--footer-container'>
                <div className='left-button'>{leftButton}</div>
                <div className='right-buttons'>
                  {rightButtons?.map((rb, index) => {
                    const rbWithKey = {
                      ...rb,
                      key: `rb-${index}`,
                      props: { ...rb.props, size: rb.props.size || 'medium' },
                    };

                    return rbWithKey;
                  })}
                </div>
              </div>
            )}
            {middleButtons && (
              <div className='dialog-box--actions-container'>
                {middleButtons?.map((mb, index) => {
                  const mbWithKey = {
                    ...mb,
                    key: `mb-${index}`,
                    props: { ...mb.props, size: mb.props.size || 'medium' },
                  };

                  return mbWithKey;
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  ) : null;
}
