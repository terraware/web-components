import React, { useEffect, useState } from 'react';
import './styles.scss';
import IconTooltip from '../IconTooltip';
import { Box, SxProps, TooltipProps } from '@mui/material';
import Icon from '../Icon/Icon';
import PillList, { PillListItem } from '../PillList';

export type MultiSelectProps<K, V> = {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  id?: string;
  label?: string;
  missingValuePlaceholder?: string;
  onAdd: (item: K) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onPillClick?: (item: K) => void;
  onRemove: (item: K) => void;
  options: Map<K, V>;
  optionsVisible?: boolean;
  pillListClassName?: string;
  placeHolder?: string;
  selectedOptions: K[];
  sx?: SxProps;
  tooltipTitle?: TooltipProps['title'];
  valueRenderer: (value: V) => string;
};

export default function MultiSelect<K, V>(props: MultiSelectProps<K, V>): JSX.Element {
  const {
    className,
    disabled,
    fullWidth,
    helperText,
    id,
    label,
    missingValuePlaceholder,
    onAdd,
    onRemove,
    onPillClick,
    options,
    optionsVisible,
    pillListClassName,
    placeHolder,
    selectedOptions,
    sx,
    tooltipTitle,
    valueRenderer,
  } = props;

  const [openedOptions, setOpenedOptions] = useState(false);

  const toggleOptions = () => {
    setOpenedOptions((isOpen) => !isOpen && !disabled);

    if (props.onFocus) {
      props.onFocus();
    }
  };

  useEffect(() => {
    if (optionsVisible !== undefined) {
      setOpenedOptions(optionsVisible);
    }
  }, [optionsVisible]);

  const onBlurHandler = () => {
    setOpenedOptions(false);

    if (props.onBlur) {
      props.onBlur();
    }
  };

  const unselectedOptions = Array.from<K>(options.keys()).filter((key: K) => !selectedOptions.includes(key));

  const valuesPillData = selectedOptions
    .map((item) => {
      const value = options.get(item);

      return {
        id: item,
        value: value ? valueRenderer(value) : missingValuePlaceholder || '',
      };
    })
    .filter((data) => data.value) as PillListItem<K>[];

  return (
    <Box className={`multi-select ${className}`} sx={sx}>
      {label && (
        <label htmlFor={id} className='multi-select__label'>
          {label} {tooltipTitle && <IconTooltip title={tooltipTitle} />}
        </label>
      )}
      <div
        className={`multi-select__container ${fullWidth ? 'multi-select__container--fullWidth' : ''}`}
        onBlur={onBlurHandler}
        tabIndex={0}
      >
        <div id={id} className={`multi-select__values${disabled ? '--disabled' : ''}`} onClick={toggleOptions}>
          {selectedOptions.length > 0 ? (
            <PillList data={valuesPillData} onRemove={onRemove} onClick={onPillClick} className={pillListClassName} />
          ) : (
            <p className='multi-select__placeholder-text'>{placeHolder}</p>
          )}
          <div className={'multi-select__values__icon-button'} aria-label='show-options'>
            <Icon
              name={openedOptions ? 'chevronUp' : 'chevronDown'}
              className={`multi-select__values__icon-right${disabled ? '--disabled' : ''}`}
            />
          </div>
        </div>
        {options && unselectedOptions.length > 0 && openedOptions && (
          <div className='multi-select__options-container'>
            <ul className={'multi-select__options'}>
              {unselectedOptions.map((optionKey, index) => {
                const optionValue = options.get(optionKey);

                return (
                  <li key={index} className='select-value' onClick={() => onAdd(optionKey)}>
                    {optionValue ? valueRenderer(optionValue) : missingValuePlaceholder || ''}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {helperText && (
        <label htmlFor={id} className='multi-select__help-text'>
          {helperText}
        </label>
      )}
    </Box>
  );
}
