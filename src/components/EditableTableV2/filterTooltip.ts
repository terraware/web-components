import { ComponentStrings } from '../../strings';
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
    arrIncludes: strings.TABLE_FILTER_INCLUDES,
    arrIncludesAll: strings.TABLE_FILTER_INCLUDES_ALL,
    arrIncludesSome: strings.TABLE_FILTER_INCLUDES,
    between: strings.TABLE_FILTER_BETWEEN,
    betweenInclusive: strings.TABLE_FILTER_BETWEEN_INCLUSIVE,
    contains: strings.TABLE_FILTER_CONTAINS,
    empty: strings.TABLE_FILTER_EMPTY,
    endsWith: strings.TABLE_FILTER_ENDS_WITH,
    equals: strings.TABLE_FILTER_EQUALS,
    equalsString: strings.TABLE_FILTER_EQUALS,
    fuzzy: strings.TABLE_FILTER_FUZZY,
    greaterThan: strings.TABLE_FILTER_GREATER_THAN,
    greaterThanOrEqualTo: strings.TABLE_FILTER_GREATER_THAN_OR_EQUAL_TO,
    inNumberRange: strings.TABLE_FILTER_BETWEEN,
    includesString: strings.TABLE_FILTER_CONTAINS,
    includesStringSensitive: strings.TABLE_FILTER_CONTAINS,
    lessThan: strings.TABLE_FILTER_LESS_THAN,
    lessThanOrEqualTo: strings.TABLE_FILTER_LESS_THAN_OR_EQUAL_TO,
    notEmpty: strings.TABLE_FILTER_NOT_EMPTY,
    notEquals: strings.TABLE_FILTER_NOT_EQUALS,
    startsWith: strings.TABLE_FILTER_STARTS_WITH,
    weakEquals: strings.TABLE_FILTER_EQUALS,
  };
  const isRange =
    definition.filterVariant?.includes('range') ||
    ['between', 'betweenInclusive', 'inNumberRange'].includes(filterType);
  const description = Array.isArray(value)
    ? value.join(`" ${isRange ? strings.TABLE_AND : strings.TABLE_OR} "`)
    : String(value);

  return strings.TABLE_FILTERING_BY.replace('{column}', definition.header)
    .replace('{filterType}', labels[filterType] ?? '')
    .replace('{filterValue}', `"${description}"`)
    .replace('" "', '');
};
