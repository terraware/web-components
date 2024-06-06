import { TableDensityType } from './types';

export const getTableCellPaddingY = (tableDensity: TableDensityType) => {
  switch(tableDensity) {
    case 'comfortable':
      return '16px';
    case 'compact':
      return '12px';
    case 'roomy':
      return '20px';
  }
};

export const getTableRowHeight = (tableDensity: TableDensityType) => {
  switch(tableDensity) {
    case 'comfortable':
      return '52px';
    case 'compact':
      return '36px';
    case 'roomy':
      return '60px';
  }
};