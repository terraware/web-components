import React from 'react';
import Pill from '../Pill';
import './styles.scss';

export type PillListItem<IdType> = {
  id: IdType;
  label?: string;
  value: string;
  onPillClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: (id: IdType) => void;
  className?: string;
};

export type PillListProps<IdType> = {
  data: PillListItem<IdType>[];
  onPillClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: (id: IdType) => void;
  className?: string;
};

export default function PillList<IdType>(props: PillListProps<IdType>): JSX.Element {
  const { data, onPillClick, onRemove, className } = props;

  return (
    <div className='pill-list'>
      {data.map((item, index) => (
        <Pill
          key={index}
          id={item.id}
          label={item.label}
          value={item.value}
          onPillClick={item.onPillClick || onPillClick}
          onRemove={item.onRemove || onRemove}
          className={item.className || className}
        />
      ))}
    </div>
  );
}
