import classNames from 'classnames';
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import './styles.scss';
import { isWhitespaces } from '../../utils';

export interface SelectTProps<T> {
  onChange: (newValue: T) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  helperText?: string | string[];
  placeholder?: string;
  errorText?: string | string[];
  warningText?: string | string[];
  selectedValue?: T;
  readonly?: boolean;
  options?: T[];
  fullWidth?: boolean;
  hideArrow?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  fixedMenu?: boolean;
  isEqual: (A: T, B: T) => boolean;
  renderOption: (option: T) => React.ReactNode;
  toT: (input: string) => T;
  displayLabel: (option: any) => string;
}

export default function SelectT<T>(props: SelectTProps<T>): JSX.Element {
  const {
    selectedValue,
    onChange,
    label,
    disabled,
    id,
    className,
    helperText,
    placeholder,
    errorText,
    warningText,
    readonly = true,
    options,
    fullWidth,
    hideArrow,
    onBlur,
    onFocus,
    fixedMenu,
    isEqual,
    renderOption,
    toT,
    displayLabel,
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
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (options && selectedValue && selectedIndex === -1) {
      let newIndex = -1;
      options.find((option, index) => {
        if (newIndex === -1 && isEqual(option, selectedValue)) {
          newIndex = index;

          return true;
        }

        return false;
      });
      if (newIndex !== -1) {
        setSelectedIndex(newIndex);
      }
    } else if (!options) {
      setSelectedIndex(-1);
    }
  }, [options, selectedValue, selectedIndex]);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (event: any) => {
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
  };

  const handleResize = () => {
    setOpenedOptions(false);
  };

  useEffect(() => {
    if (openedOptions) {
      scrollToSelectedElement();
      if (fixedMenu && inputRef.current && dropdownRef.current) {
        dropdownRef.current.style.width = `${inputRef.current.offsetWidth}px`;
        const bbox = inputRef.current.getBoundingClientRect();
        dropdownRef.current.style.top = `${bbox.top + bbox.height}px`;
        const dropdownBottom = dropdownRef.current.clientHeight + bbox.top + bbox.height;
        const windowHeightThreshold = window.innerHeight - bbox.height;
        if (dropdownBottom > windowHeightThreshold) {
          dropdownRef.current.style.maxHeight = `${
            dropdownRef.current.clientHeight - (dropdownBottom - windowHeightThreshold)
          }px`;
        }
      }
    }
  }, [fixedMenu, openedOptions]);

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
    const pressedLetter = e.key.toUpperCase();
    const items = dropdownRef.current?.getElementsByTagName('li');
    if (items) {
      const arrayOfItems = Array.from(items);
      for (const item of arrayOfItems) {
        if (item.dataset.key === pressedLetter) {
          item.scrollIntoView();

          return;
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
    <div className={`select ${className}`}>
      {label && (
        <label htmlFor={id} className='textfield-label'>
          {label}
        </label>
      )}
      <div className={`textfield-container ${fullWidth ? 'textfield-container--fullWidth' : ''}`}>
        <div id={id} className={selectClass} onClick={toggleOptions} ref={inputRef}>
          <input
            value={displayLabel(selectedValue)}
            readOnly={readonly}
            placeholder={placeholder}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          {!hideArrow && <Icon name={'chevronDown'} className='textfield-value--icon-right' />}
        </div>
        {options && options.length > 0 && openedOptions && (
          <>
            {fixedMenu && <div className='scroll-block' />}
            <ul className={'options-container' + (fixedMenu ? ' fixed-menu' : '')} ref={dropdownRef}>
              {options.map((option, index) => {
                return (
                  <li
                    data-key={displayLabel(option).charAt(0).toUpperCase()}
                    data-selected={selectedIndex === index}
                    key={index}
                    onClick={() => onOptionSelected(option, index)}
                    className={`${itemClass} ${selectedIndex === index ? 'select-value--selected' : ''} `}
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
    </div>
  );
}
