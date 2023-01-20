import { IconButton } from '@mui/material';
import React from 'react';
import Icon from '../Icon/Icon';
import './styles.scss';

type PillProps<IdType> = {
  id: IdType;
  label: string;
  value: string;
  onRemove?: (id: IdType) => void;
  className?: string;
};

export default function Pill<IdType>({ id, label, value, onRemove, className }: PillProps<IdType>): JSX.Element {
  return (
    <div className={`pill ${className ?? ''}`}>
      <p className='label'>{label}:</p>
      <p className='value'>{value}</p>
      {onRemove ? (
        <IconButton onClick={() => onRemove(id)} className='iconContainer'>
          <Icon name='close' className='icon' />
        </IconButton>
      ) : (
        <div className='spacer' />
      )}
    </div>
  );
}
