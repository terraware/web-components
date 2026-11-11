import React, { useRef, useState } from 'react';

import { Alert, Box, MenuItem, TextField } from '@mui/material';

import { useStrings } from '../../strings';
import { EditableTableCellV2, EditableTableColumnV2 } from './types';

type Props<TData extends object> = {
  cell: EditableTableCellV2<TData>;
  column: EditableTableColumnV2<TData>;
  onClose: () => void;
};

const EditableCellV2 = <TData extends object>({ cell, column, onClose }: Props<TData>) => {
  const strings = useStrings();
  const [value, setValue] = useState(() => cell.getValue<string | number | null>() ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [failed, setFailed] = useState(false);
  const finished = useRef(false);
  const config = column.editConfig;

  const cancel = () => {
    if (!isSaving) {
      finished.current = true;
      onClose();
    }
  };

  const save = async (nextValue: unknown) => {
    if (finished.current) {
      return;
    }
    finished.current = true;
    setIsSaving(true);
    setFailed(false);
    try {
      if (nextValue !== (cell.getValue() ?? '')) {
        await config?.onSave?.(cell.row.original, nextValue, column.id);
      }
      onClose();
    } catch {
      finished.current = false;
      setFailed(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box onClick={(event) => event.stopPropagation()} onDoubleClick={(event) => event.stopPropagation()}>
      {config?.editVariant === 'custom' && config.customEditComponent ? (
        <config.customEditComponent {...cell.getContext()} save={save} cancel={cancel} isSaving={isSaving} />
      ) : (
        <TextField
          autoFocus
          fullWidth
          size='small'
          select={config?.editVariant === 'select'}
          value={value}
          disabled={isSaving}
          error={failed}
          slotProps={{ htmlInput: { 'aria-label': column.header } }}
          onChange={(event) => setValue(event.target.value)}
          onBlur={() => void save(value)}
          onKeyDown={(event) => {
            event.stopPropagation();
            if (event.key === 'Enter') {
              event.preventDefault();
              void save(value);
            } else if (event.key === 'Escape') {
              event.preventDefault();
              cancel();
            }
          }}
        >
          {config?.editVariant === 'select' &&
            config.selectOptions?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      )}
      {failed && <Alert severity='error'>{strings.TABLE_SAVE_ERROR}</Alert>}
    </Box>
  );
};

export default EditableCellV2;
