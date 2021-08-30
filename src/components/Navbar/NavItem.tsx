import React, { ReactElement } from 'react';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import './styles.scss';
import { SubNavbarProps } from './SubNavbar';

export interface NavItemProps {
  label: string;
  icon?: IconName;
  children?: ReactElement<SubNavbarProps>;
  selected?: boolean;
  isSubItem?: boolean;
  onClick?: (open: boolean | undefined) => void;
}

export default function NavItem(props: NavItemProps): JSX.Element {
  const { label, icon, children, selected, onClick } = props;

  const hasChildrenSelected = () => {
    if (children) {
      if (children.props.children) {
        const subChildren = children.props.children;
        if (Array.isArray(subChildren)) {
          return subChildren.some((subChild) => subChild.props.selected);
        }

        return subChildren.props.selected;
      }
    }

    return false;
  };

  const onClickHandler = () => {
    if (onClick) {
      onClick(!open);
    }
    if (children) {
      setOpen(!open);
    }
  };

  const [open, setOpen] = React.useState(hasChildrenSelected());

  return (
    <div className={`nav-item ${selected ? 'nav-item--selected' : ''} ${hasChildrenSelected() ? 'nav-item--children-selected' : ''}`}>
      <button className='nav-item-content' onClick={onClickHandler}>
        {icon && <Icon name={icon} className='nav-item--icon' />}
        <span className='nav-item--label'>{label}</span>
        {children && <Icon name={open ? 'chevronUp' : 'chevronDown'} className='nav-item--arrow' />}
      </button>
      {children && open && children}
    </div>
  );
}
