import React, { createContext, useContext, useEffect } from 'react';

import {
  DensityLarge,
  DensityMedium,
  DensitySmall,
  FilterList,
  FilterListOff,
  Fullscreen,
  FullscreenExit,
  Search,
  SearchOff,
  ViewColumn,
} from '@mui/icons-material';
import { Box, BoxProps, IconButton, Tooltip } from '@mui/material';

import { useStrings } from '../../strings';
import { EditableTableInstanceV2 } from './types';

type ToolbarState = {
  table: object;
  globalFilterVisible: boolean;
  columnFiltersVisible: boolean;
  density: number;
  fullScreen: boolean;
  toggleGlobalFilter: () => void;
  toggleColumnFilters: () => void;
  toggleDensity: () => void;
  toggleFullScreen: () => void;
  openColumns: (anchor: HTMLElement) => void;
  registerColumnsButton: () => () => void;
};

const ToolbarContext = createContext<ToolbarState | null>(null);

export const EditableTableToolbarRoot = ({ value, ...props }: BoxProps & { value: ToolbarState }) => (
  <ToolbarContext.Provider value={value}>
    <Box {...props} />
  </ToolbarContext.Provider>
);

type ButtonProps<TData extends object> = { table: EditableTableInstanceV2<TData> };
type Action = 'globalFilter' | 'filters' | 'columns' | 'density' | 'fullScreen';

const ToolbarButton = <TData extends object>({ table, action }: ButtonProps<TData> & { action: Action }) => {
  const state = useContext(ToolbarContext);
  const strings = useStrings();
  const registerColumnsButton = state?.registerColumnsButton;
  useEffect(() => {
    if (action === 'columns') {
      return registerColumnsButton?.();
    }
  }, [action, registerColumnsButton]);
  if (!state || state.table !== table) {
    throw new Error('EditableTableV2 toolbar buttons must be rendered inside their table.');
  }
  const label = {
    globalFilter: strings.TABLE_TOGGLE_SEARCH,
    filters: strings.TABLE_TOGGLE_FILTERS,
    columns: strings.TABLE_COLUMNS,
    density: strings.TABLE_TOGGLE_DENSITY,
    fullScreen: strings.TABLE_TOGGLE_FULLSCREEN,
  }[action];
  const pressed = {
    globalFilter: state.globalFilterVisible,
    filters: state.columnFiltersVisible,
    fullScreen: state.fullScreen,
    columns: undefined,
    density: undefined,
  }[action];
  const icon = {
    globalFilter: state.globalFilterVisible ? <SearchOff /> : <Search />,
    filters: state.columnFiltersVisible ? <FilterListOff /> : <FilterList />,
    columns: <ViewColumn />,
    density: state.density === 0 ? <DensitySmall /> : state.density === 1 ? <DensityMedium /> : <DensityLarge />,
    fullScreen: state.fullScreen ? <FullscreenExit /> : <Fullscreen />,
  }[action];
  const button = (
    <IconButton
      aria-label={label}
      aria-pressed={pressed}
      onClick={(event) => {
        if (action === 'columns') {
          state.openColumns(event.currentTarget);
        } else {
          ({
            globalFilter: state.toggleGlobalFilter,
            filters: state.toggleColumnFilters,
            density: state.toggleDensity,
            fullScreen: state.toggleFullScreen,
          })[action]();
        }
      }}
    >
      {icon}
    </IconButton>
  );
  return action === 'columns' ? button : <Tooltip title={label}>{button}</Tooltip>;
};

export const EditableTableToggleGlobalFilterButtonV2 = <TData extends object>(props: ButtonProps<TData>) => (
  <ToolbarButton {...props} action='globalFilter' />
);
export const EditableTableToggleFiltersButtonV2 = <TData extends object>(props: ButtonProps<TData>) => (
  <ToolbarButton {...props} action='filters' />
);
export const EditableTableShowHideColumnsButtonV2 = <TData extends object>(props: ButtonProps<TData>) => (
  <ToolbarButton {...props} action='columns' />
);
export const EditableTableToggleDensePaddingButtonV2 = <TData extends object>(props: ButtonProps<TData>) => (
  <ToolbarButton {...props} action='density' />
);
export const EditableTableToggleFullScreenButtonV2 = <TData extends object>(props: ButtonProps<TData>) => (
  <ToolbarButton {...props} action='fullScreen' />
);
