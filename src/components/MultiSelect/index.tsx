import React, {useState} from 'react';
import './styles.scss';
import IconTooltip from '../IconTooltip';
import {IconButton, TooltipProps} from '@mui/material';
import Icon from '../Icon/Icon';
import PillList, {PillListItem} from '../PillList';

export type MultiSelectProps<T> = {
  className?: string;
  fullWidth?: boolean;
  helperText?: string;
  id?: string;
  label?: string;
  onAdd: (item: T) => void;
  onRemove: (item: T) => void;
  options: Map<T, string>;
  placeHolder?: string;
  selectedOptions: T[];
  tooltipTitle?: TooltipProps['title'];
};

export default function MultiSelect<T>(props: MultiSelectProps<T>): JSX.Element {
  const {
    className,
    fullWidth,
    helperText,
    id,
    label,
    placeHolder,
    onAdd,
    onRemove,
    options,
    selectedOptions,
    tooltipTitle,
  } = props;

  const [openedOptions, setOpenedOptions] = useState(false);

  const toggleOptions = () => {
    setOpenedOptions((isOpen) => !isOpen);
  };

  const unSelectedOptions = Array.from<T>(options.keys()).filter((key: T) => !selectedOptions.includes(key));

  const valuesPillData = selectedOptions.map((item) => {
    return {
      id: item,
      value: options.get(item),
    };
  }).filter((data) => data.value) as PillListItem<T>[];

  return (
    <div className={`multi-select ${className}`}>
      {label && (
        <label htmlFor={id} className='multi-select__label'>
          {label} {tooltipTitle && <IconTooltip title={tooltipTitle} />}
        </label>
      )}
      <div className={`multi-select__container ${fullWidth ? 'multi-select__container--fullWidth' : ''}`}>
        <div id={id} className='multi-select__values' onClick={toggleOptions}>
          {selectedOptions.length > 0
            ? (<PillList data={valuesPillData} onRemove={onRemove} onPillClick={(ev) => ev.stopPropagation()}/>)
            : (<p className='multi-select__placeholder-text' >{placeHolder}</p>)
          }
          <IconButton className={'multi-select__values__icon-button'} aria-label='show-options'>
              <Icon name={openedOptions ? 'chevronUp' : 'chevronDown'} className='multi-select__values__icon-right' />
          </IconButton>
        </div>
        {options && unSelectedOptions.length > 0 && openedOptions && (
          <div className='multi-select__options-container'>
            <ul className={'multi-select__options'}>
              {unSelectedOptions.map((optionKey, index) => {
                return (
                  <li key={index} className='select-value' onClick={() => onAdd(optionKey)}>{options.get(optionKey)}</li>
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
    </div>
  );
}
