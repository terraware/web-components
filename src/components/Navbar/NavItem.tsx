import React, { ReactElement, useCallback, type JSX } from 'react';

import theme from '../../theme';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import { SubNavbarProps } from './SubNavbar';
import './styles.scss';

export interface NavItemProps {
  label: string | React.ReactNode;
  icon?: IconName;
  iconColor?: string;
  children?: ReactElement<SubNavbarProps>;
  disabled?: boolean;
  selected?: boolean;
  onClick?: (open: boolean | undefined) => void;
  id?: string;
  isFooter?: boolean;
  href?: string; // menu is an anchor tag
}

export default function NavItem(props: NavItemProps): JSX.Element {
  const { label, icon, iconColor, children: childrenProps, disabled, selected, onClick, id, isFooter, href } = props;
  const children = href ? null : childrenProps;

  const hasChildrenSelected = useCallback(() => {
    if (children && children.props && children.props.children) {
      const subChildren = children.props.children;
      if (Array.isArray(subChildren)) {
        return subChildren.some((subChild) => subChild.props && subChild.props.selected);
      }

      return subChildren.props && subChildren.props.selected;
    }

    return false;
  }, [children]);

  React.useEffect(() => {
    if (hasChildrenSelected()) {
      setOpen(true);
    }
  }, [children, hasChildrenSelected, selected]);

  const [open, setOpen] = React.useState(hasChildrenSelected());

  const onClickHandler = () => {
    if (!disabled) {
      setOpen(!open || hasChildrenSelected());
      if (onClick) {
        onClick(!open);
      }
    }
  };

  const customLabel = typeof label !== 'string';

  return (
    <div
      className={`
        nav-item 
        ${selected ? 'nav-item--selected' : ''}
        ${hasChildrenSelected() ? 'nav-item--children-selected' : ''}
        ${isFooter ? 'nav-item--footer' : ''}
        ${children ? 'nav-item--has-children' : ''}
      `}
    >
      <button
        className={`
          ${customLabel ? 'nav-item-custom-content' : 'nav-item-content'}
          ${disabled ? 'nav-item--disabled' : ''}
        `}
        onClick={onClickHandler}
        id={id}
      >
        {icon && (
          <Icon name={icon} className='nav-item--icon' fillColor={iconColor ?? theme.palette.TwClrIcnSecondary} />
        )}
        {!href && <span className='nav-item--label'>{label}</span>}
        {href && (
          <a className='nav-item--label nav-item--anchor' href={href} rel='noopener noreferrer' target='_external'>
            {label}
          </a>
        )}
        {children && <Icon name={open ? 'chevronUp' : 'chevronDown'} className='nav-item--arrow' />}
      </button>
      {children && open && children}
    </div>
  );
}
