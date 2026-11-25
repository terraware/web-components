import type { EditableTableFilterSelectOption } from '../EditableTable';

export const getFilterOptionValue = (option: EditableTableFilterSelectOption) =>
  typeof option === 'string' ? option : option.value;

export const getFilterOptionLabel = (options: EditableTableFilterSelectOption[] | undefined, value: unknown) => {
  const option = options?.find((item) => getFilterOptionValue(item) === value);
  const fallback = String(value);

  return option !== undefined && typeof option !== 'string'
    ? option.label
    : value === null || value === undefined
      ? ''
      : fallback;
};

export const toDateInputValue = (value: unknown): string => {
  const date =
    value instanceof Date
      ? Number.isNaN(value.getTime())
        ? ''
        : value.toISOString()
      : value && typeof value === 'object' && 'format' in value && typeof value.format === 'function'
        ? value.format('YYYY-MM-DD')
        : value;

  return typeof date === 'string' && /^\d{4}-\d{2}-\d{2}(?:T|$)/.test(date) ? date.slice(0, 10) : '';
};
