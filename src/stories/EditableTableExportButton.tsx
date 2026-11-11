import React from 'react';

import { IconButton, Tooltip } from '@mui/material';

import Icon from '../components/Icon/Icon';

const EditableTableExportButton = ({ getRows }: { getRows: () => unknown[][] }) => (
  <Tooltip title='Export'>
    <IconButton
      aria-label='Export'
      onClick={() => {
        const csv = getRows()
          .map((row) => row.map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(','))
          .join('\r\n');
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'table.csv';
        link.click();
        URL.revokeObjectURL(url);
      }}
    >
      <Icon name='iconExport' size='medium' />
    </IconButton>
  </Tooltip>
);

export default EditableTableExportButton;
