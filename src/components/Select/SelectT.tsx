import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Box, SxProps, TooltipProps } from '@mui/material';
import classNames from 'classnames';

import { isWhitespaces } from '../../utils';
import Icon from '../Icon/Icon';
import IconTooltip from '../IconTooltip';
import './styles.scss';

// Styles for overriding select dropdown
export interface SelectStyles {
  arrow?: Record<string, any>;
  input?: Record<string, any>;
  inputContainer?: Record<string, any>;
  optionContainer?: Record<string, any>;
  optionsContainer?: Record<string, any>;
}

export interface SelectTProps<T> {
  className?: string;
  disabled?: boolean;
  displayLabel: (option: any) => string;
  editable?: boolean;
  errorText?: string | string[];
  fixedMenu?: boolean;
  fullWidth?: boolean;
  helperText?: string | string[];
  hideArrow?: boolean;
  id?: string;
  isEqual: (A: T, B: T) => boolean;
  label?: string;
  onBlur?: () => void;
  onChange: (newValue: T) => void;
  onFocus?: () => void;
  options?: T[];
  placeholder?: string;
  readonly?: boolean;
  renderOption: (option: T) => React.ReactNode;
  required?: boolean;
  selectedValue?: T;
  selectStyles?: SelectStyles;
  sx?: SxProps;
  toT: (input: string) => T;
  tooltipTitle?: TooltipProps['title'];
  warningText?: string | string[];
}

export default function SelectT<T>(props: SelectTProps<T>): JSX.Element {
  const {
    className,
    disabled,
    displayLabel,
    editable,
    errorText,
    fixedMenu,
    fullWidth,
    helperText,
    hideArrow,
    id,
    isEqual,
    label,
    onBlur,
    onChange,
    onFocus,
    options,
    placeholder,
    readonly,
    renderOption,
    required,
    selectedValue,
    selectStyles,
    sx,
    tooltipTitle,
    toT,
    warningText,
  } = props;

  const selectClass = classNames({
    'textfield-value': true,
    'textfield-value--disabled': disabled,
    'textfield-value--error': !!errorText,
    'textfield-value--warning': !!warningText,
    'textfield-value--readonly': readonly,
  });

  const itemClass = classNames({
    'select-value': true,
    'select-value--disabled': disabled,
  });

  const [openedOptions, setOpenedOptions] = useState(false);
  const [fixedMenuPositioned, setFixedMenuPositioned] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const hasOptions = useMemo<boolean>(() => options !== undefined && options.length > 0, [options]);

  const repositionMenu = useCallback(
    (checkHeight: boolean) => {
      if (openedOptions && hasOptions) {
        scrollToSelectedElement();
        if (fixedMenu && inputRef.current && dropdownRef.current) {
          dropdownRef.current.style.width = `${inputRef.current.offsetWidth}px`;
          const bbox = inputRef.current.getBoundingClientRect();
          dropdownRef.current.style.top = `${bbox.top + bbox.height}px`;
          const dropdownBottom = dropdownRef.current.clientHeight + bbox.top + bbox.height;
          const windowHeightThreshold = window.innerHeight - bbox.height;
          if (checkHeight && dropdownBottom > windowHeightThreshold) {
            dropdownRef.current.style.maxHeight = `${
              dropdownRef.current.clientHeight - (dropdownBottom - windowHeightThreshold)
            }px`;
          }
          setFixedMenuPositioned(true);
        }
      } else if (fixedMenu) {
        setFixedMenuPositioned(false);
      }
    },
    [fixedMenu, openedOptions, hasOptions]
  );

  useEffect(() => {
    repositionMenu(true);
  }, [repositionMenu]);

  useEffect(() => {
    let newIndex = -1;
    if (options && selectedValue) {
      options.find((option, index) => {
        if (isEqual(option, selectedValue)) {
          newIndex = index;

          return true;
        }

        return false;
      });
    }
    if (newIndex !== selectedIndex) {
      setSelectedIndex(newIndex);
    }
  }, [options, selectedValue, selectedIndex, isEqual]);

  const handleScroll = useCallback(() => {
    repositionMenu(false);
  }, [repositionMenu]);

  const handleClick = useCallback((event: any) => {
    // Don't respond to user clicks inside the input box because those are
    // already handled by toggleOptions()
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setOpenedOptions(false);
    }
  }, []);

  const handleResize = useCallback(() => {
    setOpenedOptions(false);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleClick, handleResize, handleScroll]);

  const toggleOptions = () => {
    setOpenedOptions((isOpen) => !isOpen);
  };

  const onOptionSelected = (option: T, index: number) => {
    if (onChange) {
      onChange(option);
    }
    setOpenedOptions(false);
    setSelectedIndex(index);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const textValue = e.target.value;
    if (isWhitespaces(textValue)) {
      return;
    }
    if (onChange) {
      onChange(toT(textValue));
    }
    setOpenedOptions(true);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      toggleOptions();
    } else {
      const pressedLetter = e.key.toUpperCase();
      const items = dropdownRef.current?.getElementsByTagName('li');
      if (items) {
        const arrayOfItems = Array.from(items);
        for (const item of arrayOfItems) {
          if (item.dataset.key === pressedLetter) {
            item.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });

            return;
          }
        }
      }
    }
  };

  const scrollToSelectedElement = () => {
    const items = dropdownRef.current?.getElementsByTagName('li');
    if (items) {
      const arrayOfItems = Array.from(items);
      for (const item of arrayOfItems) {
        if (item.dataset.selected === 'true') {
          if (dropdownRef.current) {
            const topPos = item.offsetTop;
            dropdownRef.current.scrollTop = topPos;

            return;
          }
        }
      }
    }
  };

  return (
    <Box className={`select ${className}`} sx={sx}>
      {label && (
        <label htmlFor={id} className='textfield-label'>
          {label} {required ? '*' : ''} {tooltipTitle && <IconTooltip title={tooltipTitle} />}
        </label>
      )}
      <div className={`textfield-container ${fullWidth ? 'textfield-container--fullWidth' : ''}`}>
        <div
          id={id}
          className={selectClass}
          onClick={toggleOptions}
          ref={inputRef}
          style={(selectStyles || {}).inputContainer}
        >
          <input
            value={displayLabel(selectedValue)}
            readOnly={!editable || readonly}
            placeholder={placeholder}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            onBlur={onBlur}
            onFocus={onFocus}
            required={required}
            style={(selectStyles || {}).input}
          />
          {!hideArrow && (
            <Icon name={'chevronDown'} className='textfield-value--icon-right' style={(selectStyles || {}).arrow} />
          )}
        </div>
        {options && options.length > 0 && openedOptions && (
          <>
            {fixedMenu && <div className='scroll-block' />}
            <ul
              className={
                'options-container' + (fixedMenu ? ' fixed-menu' : '') + (fixedMenuPositioned ? ' positioned' : '')
              }
              ref={dropdownRef}
              style={(selectStyles || {}).optionsContainer}
            >
              {options.map((option, index) => {
                return (
                  <li
                    data-key={displayLabel(option).charAt(0).toUpperCase()}
                    data-selected={selectedIndex === index}
                    key={index}
                    onClick={() => (!readonly ? onOptionSelected(option, index) : undefined)}
                    className={`${itemClass} ${selectedIndex === index ? 'select-value--selected' : ''} `}
                    style={(selectStyles || {}).optionContainer}
                  >
                    {renderOption(option)}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
      {errorText && (
        <div className='textfield-label-container'>
          <Icon name='error' className='textfield-error-text--icon' />
          <label htmlFor={id} className='textfield-error-text'>
            {errorText}
          </label>
        </div>
      )}
      {warningText && (
        <div className='textfield-label-container'>
          <Icon name='warning' className='textfield-warning-text--icon' />
          <label htmlFor={id} className='textfield-warning-text'>
            {warningText}
          </label>
        </div>
      )}
      {helperText && (
        <label htmlFor={id} className='textfield-help-text'>
          {helperText}
        </label>
      )}
    </Box>
  );
}
