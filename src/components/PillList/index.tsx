import React, { type JSX } from 'react';

import Pill from '../Pill';
import './styles.scss';

export type PillListItem<IdType> = {
  id: IdType;
  label?: string;
  value: string;
  onClick?: (id: IdType) => void;
  onRemove?: (id: IdType) => void;
  className?: string;
};

export type PillListProps<IdType> = {
  data: PillListItem<IdType>[];
  onClick?: (id: IdType) => void;
  onRemove?: (id: IdType) => void;
  className?: string;
};

export default function PillList<IdType>(props: PillListProps<IdType>): JSX.Element {
  const { data, onClick, onRemove, className } = props;

  return (
    <div className='pill-list'>
      {data.map((item, index) => (
        <Pill
          key={index}
          id={item.id}
          label={item.label}
          value={item.value}
          onClick={item.onClick || onClick}
          onRemove={item.onRemove || onRemove}
          className={item.className || className}
        />
      ))}
    </div>
  );
}
