import { ComponentStrings } from '../../strings';
import { getFilterOptionLabel } from './filterValues';
import { EditableTableColumnV2 } from './types';

export const filterTooltip = <TData extends object>(
  definition: EditableTableColumnV2<TData>,
  value: unknown,
  strings: ComponentStrings
): string => {
  const filterType =
    typeof definition.filterFn === 'string'
      ? definition.filterFn
      : typeof definition.filterFn === 'function'
        ? definition.filterFn.name
        : definition.filterVariant === 'multi-select'
          ? 'arrIncludesSome'
          : definition.filterVariant?.includes('range')
            ? 'betweenInclusive'
            : definition.filterVariant === 'select'
              ? 'equals'
              : 'fuzzy';
  const labels: Record<string, string> = {
    arrIncludes: strings.INCLUDES,
    arrIncludesAll: strings.INCLUDES_ALL,
    arrIncludesSome: strings.INCLUDES,
    between: strings.BETWEEN,
    betweenInclusive: strings.BETWEEN_INCLUSIVE,
    contains: strings.CONTAINS,
    empty: strings.EMPTY,
    endsWith: strings.ENDS_WITH,
    equals: strings.EQUALS,
    equalsString: strings.EQUALS,
    fuzzy: strings.FUZZY,
    greaterThan: strings.GREATER_THAN,
    greaterThanOrEqualTo: strings.GREATER_THAN_OR_EQUAL_TO,
    inNumberRange: strings.BETWEEN,
    includesString: strings.CONTAINS,
    includesStringSensitive: strings.CONTAINS,
    lessThan: strings.LESS_THAN,
    lessThanOrEqualTo: strings.LESS_THAN_OR_EQUAL_TO,
    notEmpty: strings.NOT_EMPTY,
    notEquals: strings.NOT_EQUALS,
    startsWith: strings.STARTS_WITH,
    weakEquals: strings.EQUALS,
  };
  const isRange =
    definition.filterVariant?.includes('range') ||
    ['between', 'betweenInclusive', 'inNumberRange'].includes(filterType);
  const isSelect = definition.filterVariant === 'select' || definition.filterVariant === 'multi-select';
  const describe = (entry: unknown) => getFilterOptionLabel(definition.filterSelectOptions, entry);
  const description = Array.isArray(value)
    ? (isSelect ? value.map(describe) : value).join(`" ${isRange ? strings.AND : strings.OR} "`)
    : isSelect
      ? describe(value)
      : String(value);

  return strings.FILTERING_BY_COLUMN_FILTER_TYPE_FILTER_VALUE.replace('{column}', definition.header)
    .replace('{filterType}', labels[filterType] ?? '')
    .replace('{filterValue}', `"${description}"`)
    .replace('" "', '');
};
