import React, { type JSX, useMemo } from 'react';

import EnhancedTableToolbar from './EnhancedTableToolbar';
import { EnhancedTopBarSelectionProps, TopBarButton } from './index';

export interface EnhancedTopBarSelectionConfig {
  handleSelectAll?: () => void;
  handleSelectNone?: () => void;
  renderEnhancedNumSelectedText?: () => string;
  renderSelectAllText?: () => string;
  renderSelectNoneText?: () => string;
}

type DecoratedEnhancedTopBarSelectionConfig = Omit<
  EnhancedTopBarSelectionConfig,
  'renderEnhancedNumSelectedText' | 'renderSelectAllText' | 'renderSelectNoneText'
> &
  EnhancedTopBarSelectionProps;

interface EnhancedTableToolbarV2Props {
  selectedRowsCount: number;
  pagesCount: number;
  renderNumSelectedText?: (selectedCount: number) => string;
  rowsCount: number;
  topBarButtons?: (TopBarButton | JSX.Element)[];
  topBarSelectionConfig?: DecoratedEnhancedTopBarSelectionConfig;
}

const EnhancedTableToolbarV2 = ({
  selectedRowsCount,
  pagesCount,
  renderNumSelectedText,
  rowsCount,
  topBarButtons,
  topBarSelectionConfig,
}: EnhancedTableToolbarV2Props) => {
  const _topBarSelectionConfig = useMemo((): EnhancedTopBarSelectionConfig | undefined => {
    if (!topBarSelectionConfig) {
      return topBarSelectionConfig;
    }

    const { renderEnhancedNumSelectedText, renderSelectAllText } = topBarSelectionConfig;

    return {
      ...topBarSelectionConfig,
      renderEnhancedNumSelectedText: () =>
        (renderEnhancedNumSelectedText && renderEnhancedNumSelectedText(selectedRowsCount || 0, pagesCount)) || '',
      renderSelectAllText: () => (renderSelectAllText && renderSelectAllText(rowsCount)) || '',
    };
  }, [topBarSelectionConfig, selectedRowsCount, rowsCount, pagesCount]);

  if (topBarSelectionConfig) {
    return (
      <EnhancedTableToolbar
        numSelected={selectedRowsCount}
        topBarButtons={topBarButtons}
        topBarSelectionConfig={_topBarSelectionConfig}
        isAllSelected={rowsCount === selectedRowsCount}
        renderNumSelectedText={renderNumSelectedText}
      />
    );
  }

  return (
    <EnhancedTableToolbar
      numSelected={selectedRowsCount}
      renderNumSelectedText={renderNumSelectedText}
      topBarButtons={topBarButtons}
    />
  );
};

export default EnhancedTableToolbarV2;
