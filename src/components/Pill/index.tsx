import { IconButton } from '@mui/material';
import React from 'react';
import Icon from '../Icon/Icon';
import './styles.scss';

type PillProps<IdType> = {
  id: IdType;
  label?: string;
  value: string;
  onPillClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: (id: IdType) => void;
  className?: string;
};

export default function Pill<IdType>(props: PillProps<IdType>): JSX.Element {
  const {id, label, value, onPillClick, onRemove, className } = props;

  return (
    <div className={`pill ${className ?? ''}`} onClick={onPillClick}>
      {label && (<p className='label'>{label}:</p>)}
      <p className='value'>{value}</p>
      {onRemove ? (
        <IconButton onClick={() => onRemove(id)} className='iconContainer' aria-label='remove'>
          <Icon name='close' className='icon' />
        </IconButton>
      ) : (
        <div className='spacer' />
      )}
    </div>
  );
}
