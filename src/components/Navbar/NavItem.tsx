import React from 'react';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import './styles.scss';

export interface Props {
  label: string;
  icon?: IconName;
  children?: JSX.Element;
}

export default function NavItem(props: Props): JSX.Element {
  const { label, icon, children } = props;

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      {icon && <Icon name={icon} />}
      {label}
      {children && (
        <button onClick={() => setOpen(!open)}>
          <Icon name={open ? 'caretUp' : 'caretDown'} />
        </button>
      )}
      {children && open && children}
    </div>
  );
}
