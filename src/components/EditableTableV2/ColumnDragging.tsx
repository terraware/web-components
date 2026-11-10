import React, { ReactNode, createContext, useCallback, useContext, useRef, useState } from 'react';

import {
  ClientRect,
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { DragHandle } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  MenuItemProps,
  MenuProps,
  TableCell,
  TableCellProps,
  TableContainer,
  TableContainerProps,
  Tooltip,
  useTheme,
} from '@mui/material';

import { useStrings } from '../../strings';

type DragContextProps = { ids: string[]; onDragEnd: (event: DragEndEvent) => void };

const ColumnDragContext = ({ ids, onDragEnd, children }: DragContextProps & { children: ReactNode }) => {
  const [overlay, setOverlay] = useState<{ html: string; rect: ClientRect } | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={{ dragOverlay: { measure: (node) => overlay?.rect ?? node.getBoundingClientRect() } }}
      onDragStart={({ active }) => {
        const element = active.data.current?.getDragElement() as HTMLElement | null;
        if (element) {
          const { width, height, top, left, right, bottom } = element.getBoundingClientRect();
          const rect = { width, height, top, left, right, bottom };
          const html =
            element.tagName === 'TH'
              ? `<table style="border-collapse:collapse;width:${rect.width}px"><thead><tr>${element.outerHTML}</tr></thead></table>`
              : `<ul style="margin:0;padding:0;list-style:none">${element.outerHTML}</ul>`;
          setOverlay({ html, rect });
        }
      }}
      onDragCancel={() => setOverlay(null)}
      onDragEnd={(event) => {
        setOverlay(null);
        onDragEnd(event);
      }}
    >
      <SortableContext items={ids}>{children}</SortableContext>
      <DragOverlay dropAnimation={null} zIndex={1500}>
        {overlay && (
          <Box
            aria-hidden
            data-testid='column-drag-overlay'
            sx={{
              width: overlay.rect.width,
              height: overlay.rect.height,
              opacity: 0.65,
              bgcolor: 'background.paper',
              pointerEvents: 'none',
            }}
            dangerouslySetInnerHTML={{ __html: overlay.html }}
          />
        )}
      </DragOverlay>
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

const useColumnDrag = ({ id, label, enabled }: ColumnDragProps, activeOutlineWidth = 1) => {
  const strings = useStrings();
  const theme = useTheme();
  const element = useRef<HTMLElement | null>(null);
  const { setNodeRef, setActivatorNodeRef, attributes, listeners, isDragging, isOver } = useSortable({
    id,
    disabled: !enabled,
    data: { getDragElement: () => element.current },
  });
  const ref = useCallback(
    (node: HTMLElement | null) => {
      element.current = node;
      setNodeRef(node);
    },
    [setNodeRef]
  );
  const dragStyles = {
    outline: isDragging
      ? `${activeOutlineWidth}px dashed ${theme.palette.grey[500]}`
      : isOver
        ? `2px dashed ${theme.palette.primary.main}`
        : undefined,
    outlineOffset: '-2px',
  };
  const handle = enabled && (
    <Tooltip title={strings.TABLE_MOVE} placement='top'>
      <IconButton
        size='small'
        disableRipple
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        aria-label={`${strings.TABLE_DRAG_COLUMN}: ${label}`}
        sx={{
          touchAction: 'none',
          cursor: 'grab',
          '&:active': { cursor: 'grabbing' },
          '&:hover': { backgroundColor: 'transparent', opacity: 1 },
          m: '0 -0.1rem',
          opacity: 0.5,
          p: '2px',
          transition: 'all 150ms ease-in-out',
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <DragHandle />
      </IconButton>
    </Tooltip>
  );
  return { ref, handle, dragStyles, isDragging };
};

export const DraggableColumnHeader = ({ id, label, enabled, ...props }: ColumnDragProps & TableCellProps) => {
  const { ref, handle, dragStyles } = useColumnDrag({ id, label, enabled });
  return (
    <DragHandleContext.Provider value={handle}>
      <TableCell {...props} ref={ref} sx={[...(Array.isArray(props.sx) ? props.sx : [props.sx]), dragStyles]} />
    </DragHandleContext.Provider>
  );
};

export const DraggableColumnItem = ({ id, label, enabled, ...props }: ColumnDragProps & MenuItemProps) => {
  const { ref, handle, dragStyles, isDragging } = useColumnDrag({ id, label, enabled }, 2);
  return (
    <DragHandleContext.Provider value={handle}>
      <MenuItem
        {...props}
        ref={ref}
        sx={[...(Array.isArray(props.sx) ? props.sx : [props.sx]), dragStyles, { opacity: isDragging ? 0.5 : 1 }]}
      />
    </DragHandleContext.Provider>
  );
};
