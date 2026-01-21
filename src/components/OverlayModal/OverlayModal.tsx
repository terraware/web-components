import React, { ReactNode, useEffect } from 'react';

import { IconButton } from '@mui/material';

import Icon from '../Icon/Icon';
import './styles.scss';

export interface Props {
  children: ReactNode;
  belowComponent?: ReactNode;
  open: boolean;
  onClose?: () => void;
  onEscapeClose?: boolean;
  onClickOutClose?: boolean;
  minHeight?: string | number;
}

const OverlayModal = (props: Props) => {
  const {
    children,
    belowComponent,
    open,
    onClose,
    onEscapeClose = true,
    onClickOutClose = true,
    minHeight = '300px',
  } = props;

  useEffect(() => {
    if (!open || !onEscapeClose) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onEscapeClose, onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      onClickOutClose &&
      event.target instanceof HTMLElement &&
      event.target.classList.contains('overlay-modal-backdrop')
    ) {
      onClose?.();
    }
  };

  return open ? (
    <div className={'overlay-modal-backdrop'} onClick={handleBackdropClick}>
      <div className={'overlay-modal-container'}>
        <IconButton onClick={onClose} className={'overlay-modal-close'}>
          <Icon size={'xlarge'} name='close' className={'icon-close'} />
        </IconButton>
        <div className='overlay-modal' style={{ minHeight }}>
          <div className='overlay-modal-content'>{children}</div>
        </div>
        {belowComponent && <div className='overlay-modal-below'>{belowComponent}</div>}
      </div>
    </div>
  ) : null;
};

export default OverlayModal;
