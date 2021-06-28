import React from 'react';
import './styles.scss';

export interface Props {
  onClick: () => void;
  label: string;
  type: 'productive' | 'passive' | 'destructive';
  priority: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large' | 'xlarge';
  disabled: boolean;
}

export default function Button(props: Props): JSX.Element {
  const {
    onClick,
    label,
    type = 'productive',
    priority = 'primary',
    size = 'small',
    disabled = false,
  } = props;
  return (
    <button
      onClick={onClick}
      className={`button ${type}-${priority} button--${size} ${type}-${priority}--${size}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
