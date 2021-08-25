import React, { MouseEventHandler, PropsWithChildren, ReactElement } from 'react';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import './styles.scss';
import SubNavbar, { SubNavbarProps } from './SubNavbar';

export interface NavItemProps {
  label: string;
  icon?: IconName;
  children?: typeof SubNavbar;
  selected?: boolean;
  isSubItem?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function NavItem(props: NavItemProps): JSX.Element {
  const { label, icon, children, selected, onClick } = props;

  const hasChildrenSelected = () => {
    if (children) {
      const item = (children as unknown) as ReactElement<PropsWithChildren<SubNavbarProps>>;
      if (item.props.children) {
        const subChildren = item.props.children;
        if (Array.isArray(subChildren)) {
          return subChildren.some((subChild) => {
            const item = subChild as ReactElement<PropsWithChildren<NavItemProps>>;
            return item.props.selected;
          });
        } else {
          const item = subChildren as ReactElement<PropsWithChildren<NavItemProps>>;
          return item.props.selected;
        }
      }
    }

    return false;
  };

  const [open, setOpen] = React.useState(hasChildrenSelected());

  return (
    <div className={`nav-item ${selected ? 'nav-item--selected' : ''} ${hasChildrenSelected() ? 'nav-item--children-selected' : ''}`}>
      <button className='nav-item-content' onClick={onClick ?? (() => setOpen(!open))}>
        {icon && <Icon name={icon} className='nav-item--icon' />}
        <span className='nav-item--label'>{label}</span>
        {children && <Icon name={open ? 'caretUp' : 'caretDown'} className='nav-item--arrow' />}
      </button>
      {children && open && children}
    </div>
  );
}
