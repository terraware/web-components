import React, { ReactNode } from 'react';
import './styles.scss';
import Icon from '../Icon/Icon';
import { IconButton } from '@mui/material';
import { useDeviceInfo } from '../../utils';

export interface Props {
  type: 'page' | 'toast';
  priority: 'info' | 'critical' | 'warning' | 'success';
  title?: string | string[];
  body: string | JSX.Element | (string | JSX.Element)[];
  actionText?: string;
  actionHandler?: () => void;
  pageButtons?: JSX.Element[];
  showCloseButton?: boolean;
  onClose?: () => void;
}

export default function Message(props: Props): JSX.Element | null {
  const { type, priority, title, body, actionText, actionHandler, pageButtons, showCloseButton, onClose } = props;
  const { isMobile } = useDeviceInfo();

  return (
    <div className={`tw-message tw-message--${type} tw-message--${priority} ${isMobile ? 'tw-message--mobile' : ''}`}>
      {type === 'toast' && (
        <div className='tw-message--left-side'>
          <Icon name={priority} className='left-side--icon' />
        </div>
      )}
      <div className='tw-message--container'>
        <div className='tw-message--main-content'>
          {type === 'page' && <Icon name={priority} className='main-content--icon' />}
          <div className='tw-message--main-body'>
            {title && (
              <div className='tw-message--title-container'>
                <h4>{title}</h4>
              </div>
            )}
            <p>{body}</p>
            {type === 'page' && pageButtons && pageButtons.length > 0 ? (
              <div className='tw-message--actions-container'>
                {pageButtons?.map((pageButton, index) => {
                  const pageButtonWithKey = {
                    ...pageButton,
                    key: `page-button-${index}`,
                    props: { ...pageButton.props, size: pageButton.props.size || 'medium' },
                  };

                  return pageButtonWithKey;
                })}
              </div>
            ) : null}
          </div>
        </div>
        {type === 'toast' && actionText ? (
          <button onClick={actionHandler} className='tw-message--action-text'>
            {actionText}
          </button>
        ) : showCloseButton ? (
          <button onClick={onClose} className='icon-container'>
            <Icon name='close' className='page-message--close-icon' />
          </button>
        ) : null}
      </div>
    </div>
  );
}
