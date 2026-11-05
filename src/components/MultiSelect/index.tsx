import React, { CSSProperties, type JSX, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Box, SxProps, TooltipProps } from '@mui/material';

import Icon from '../Icon/Icon';
import IconTooltip from '../IconTooltip';
import PillList, { PillListItem } from '../PillList';
import './styles.scss';

const OPTIONS_MAX_HEIGHT = 140;
const VIEWPORT_MARGIN = 8;

const getVerticalFrameHeight = (element: HTMLElement) => {
  const style = getComputedStyle(element);
  const spacing = [style.paddingTop, style.paddingBottom, style.marginTop, style.marginBottom].reduce(
    (total, value) => total + (parseFloat(value) || 0),
    0
  );

  return element.offsetHeight - element.clientHeight + spacing;
};

export type MultiSelectProps<K, V> = {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  errorText?: string;
  fixedMenu?: boolean;
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
    errorText,
    fixedMenu,
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
  const [fixedMenuStyle, setFixedMenuStyle] = useState<CSSProperties>();
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const positionFixedMenu = useCallback(() => {
    const trigger = optionsContainerRef.current?.parentElement;
    if (!optionsContainerRef.current || !trigger) {
      return;
    }

    const { top, left, width } = optionsContainerRef.current.getBoundingClientRect();
    const triggerTop = trigger.getBoundingClientRect().top;
    const spaceBelow = window.innerHeight - top - VIEWPORT_MARGIN;
    const spaceAbove = triggerTop - VIEWPORT_MARGIN;
    const placeAbove = spaceBelow < OPTIONS_MAX_HEIGHT && spaceAbove > spaceBelow;
    const menuFrameHeight = optionsRef.current ? getVerticalFrameHeight(optionsRef.current) : 0;

    setFixedMenuStyle({
      position: 'fixed',
      left,
      width: width - 2,
      maxHeight: Math.max(0, Math.min(OPTIONS_MAX_HEIGHT, (placeAbove ? spaceAbove : spaceBelow) - menuFrameHeight)),
      ...(placeAbove ? { top: 'auto', bottom: window.innerHeight - triggerTop } : { top }),
    });
  }, []);

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

  const unselectedOptions = Array.from<K>(options.keys()).filter((key: K) => !selectedOptions.includes(key));
  const optionsShown = options && unselectedOptions.length > 0 && openedOptions;

  useLayoutEffect(() => {
    if (!fixedMenu || !optionsShown) {
      return;
    }

    positionFixedMenu();
    window.addEventListener('scroll', positionFixedMenu, true);
    window.addEventListener('resize', positionFixedMenu);
    const triggerObserver = new ResizeObserver(positionFixedMenu);
    if (optionsContainerRef.current?.parentElement) {
      triggerObserver.observe(optionsContainerRef.current.parentElement);
    }

    return () => {
      window.removeEventListener('scroll', positionFixedMenu, true);
      window.removeEventListener('resize', positionFixedMenu);
      triggerObserver.disconnect();
    };
  }, [fixedMenu, optionsShown, positionFixedMenu]);

  const onBlurHandler = (event: any) => {
    // In Chrome > 126, the onBlur event will fire even if you are clicking _within_ the focused element
    // If this is the case, we do not actually want to blur
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }

    setOpenedOptions(false);

    if (props.onBlur) {
      props.onBlur();
    }
  };

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
        <div
          id={id}
          className={`multi-select__values${disabled ? '--disabled' : ''}${openedOptions ? ' open' : ''}${
            errorText ? ' error' : ''
          }`}
          onClick={toggleOptions}
        >
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
        {optionsShown && (
          <div className='multi-select__options-container' ref={optionsContainerRef}>
            <ul
              className={`multi-select__options${fixedMenu && fixedMenuStyle?.bottom !== undefined ? ' multi-select__options--above' : ''}`}
              ref={optionsRef}
              style={fixedMenu ? fixedMenuStyle : undefined}
            >
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
      {errorText && (
        <div className='multi-select__error'>
          <Icon name='error' className='multi-select__error-icon' />
          <label htmlFor={id} className='multi-select__error-text'>
            {errorText}
          </label>
        </div>
      )}
    </Box>
  );
}
