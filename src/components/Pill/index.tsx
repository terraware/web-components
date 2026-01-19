import React, { type JSX } from 'react';

import { IconButton } from '@mui/material';

import Icon from '../Icon/Icon';
import './styles.scss';

type PillProps<IdType> = {
  id: IdType;
  label?: string;
  value: string;
  onClick?: (id: IdType) => void;
  onRemove?: (id: IdType) => void;
  className?: string;
};

export default function Pill<IdType>(props: PillProps<IdType>): JSX.Element {
  const { id, label, value, onClick, onRemove, className } = props;

  return (
    <div
      className={`pill ${className ?? ''}`}
      onClick={(ev) => {
        ev.stopPropagation();
        if (onClick) {
          onClick(id);
        }
      }}
    >
      {label && <p className='label'>{label}:</p>}
      <p className={`value${label ? '' : ' value--no-label'}`}>{value}</p>
      {onRemove ? (
        <IconButton
          onClick={(ev) => {
            ev.stopPropagation();
            onRemove(id);
          }}
          className='iconContainer'
          aria-label='remove'
        >
          <Icon name='close' className='icon' />
        </IconButton>
      ) : (
        <div className='spacer' />
      )}
    </div>
  );
}
