import classNames from 'classnames';
import React, { ChangeEventHandler, Fragment, ReactNode } from 'react';
import './styles.scss';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

export interface Props {
  title: string;
  size: 'small' | 'medium' | 'large' | 'x-large';
  message?: string;
  children?: ReactNode;
  leftButton?: ReactNode;
  rightButtons?: ReactNode[];
  middleButtons?: ReactNode[];
}

export default function DialogBox(props: Props): JSX.Element {
  const { title, size, message, children, leftButton, rightButtons, middleButtons } = props;

  const hasFooter = leftButton || rightButtons || middleButtons;

  return (
    <div className={`dialog-box dialog-box--${size}`}>
      <div className='dialog-box--header'>
        <p className='title'>{title}</p>
        <Icon name={'close'} className='icon-close' />
      </div>
      <div className={hasFooter ? 'dialog-box--body' : 'dialog-box--body-no-footer'}>
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
                  return <Fragment key={`rb-${index}`}>{rb}</Fragment>;
                })}
              </div>
            </div>
          )}
          {middleButtons && (
            <div className='dialog-box--actions-container'>
              {middleButtons?.map((mb, index) => {
                return <Fragment key={`mb-${index}`}>{mb}</Fragment>;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
