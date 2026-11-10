import React, { ReactNode, createContext, useContext } from 'react';

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { DragIndicator } from '@mui/icons-material';
import {
  IconButton,
  Menu,
  MenuItem,
  MenuItemProps,
  MenuProps,
  TableCell,
  TableCellProps,
  TableContainer,
  TableContainerProps,
} from '@mui/material';

import { useStrings } from '../../strings';

type DragContextProps = { ids: string[]; onDragEnd: (event: DragEndEvent) => void };

const ColumnDragContext = ({ ids, onDragEnd, children }: DragContextProps & { children: ReactNode }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={ids}>{children}</SortableContext>
    </DndContext>
  );
};

export const ColumnDragMenu = ({ ids, onDragEnd, ...props }: DragContextProps & Omit<MenuProps, 'onDragEnd'>) => (
  <ColumnDragContext ids={ids} onDragEnd={onDragEnd}>
    <Menu {...props} />
  </ColumnDragContext>
);

export const ColumnDragTableContainer = ({
  ids,
  onDragEnd,
  ...props
}: DragContextProps & Omit<TableContainerProps, 'onDragEnd'>) => (
  <ColumnDragContext ids={ids} onDragEnd={onDragEnd}>
    <TableContainer {...props} />
  </ColumnDragContext>
);

const DragHandleContext = createContext<ReactNode>(null);
export const ColumnDragHandle = () => useContext(DragHandleContext);

type ColumnDragProps = {
  id: string;
  label: string;
  enabled: boolean;
};

const useColumnDrag = ({ id, label, enabled }: ColumnDragProps) => {
  const strings = useStrings();
  const { setNodeRef, setActivatorNodeRef, attributes, listeners } = useSortable({ id, disabled: !enabled });
  const handle = enabled && (
    <IconButton
      size='small'
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      aria-label={`${strings.TABLE_DRAG_COLUMN}: ${label}`}
      sx={{ touchAction: 'none', cursor: 'grab' }}
      onClick={(event) => event.stopPropagation()}
    >
      <DragIndicator fontSize='small' />
    </IconButton>
  );
  return { setNodeRef, handle };
};

export const DraggableColumnHeader = ({ id, label, enabled, ...props }: ColumnDragProps & TableCellProps) => {
  const { setNodeRef, handle } = useColumnDrag({ id, label, enabled });
  return (
    <DragHandleContext.Provider value={handle}>
      <TableCell ref={setNodeRef} {...props} />
    </DragHandleContext.Provider>
  );
};

export const DraggableColumnItem = ({ id, label, enabled, ...props }: ColumnDragProps & MenuItemProps) => {
  const { setNodeRef, handle } = useColumnDrag({ id, label, enabled });
  return (
    <DragHandleContext.Provider value={handle}>
      <MenuItem ref={setNodeRef} {...props} />
    </DragHandleContext.Provider>
  );
};
