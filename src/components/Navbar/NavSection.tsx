import React from 'react';
import './styles.scss';

export interface Props {
  title?: string;
  hideSeparator?: boolean;
}

export default function NavSection(props: Props): JSX.Element {
  const { title, hideSeparator } = props;

  return (
    <div className='nav-section'>
      { !hideSeparator ? <div className='divider' /> }
      {title && <span className='nav-section--title'>{title}</span>}
    </div>
  );
}
