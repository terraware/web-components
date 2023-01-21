import React from 'react';
import Pill from '../Pill';
import { Box } from '@mui/material';

export type PillListItem<IdType> = {
  id: IdType;
  label: string;
  value: string;
  onRemove?: (id: IdType) => void;
  className?: string;
};

export type PillListProps<IdType> = {
  data: PillListItem<IdType>[];
  onRemove?: (id: IdType) => void;
  className?: string;
};

export default function PillList<IdType>(props: PillListProps<IdType>): JSX.Element {
  const { data, onRemove, className } = props;

  return (
    <Box display='flex' flexWrap='wrap'>
      {data.map((item, index) => (
        <Pill
          key={index}
          id={item.id}
          label={item.label}
          value={item.value}
          onRemove={item.onRemove || onRemove}
          className={item.className || className}
        />
      ))}
    </Box>
  );
}
