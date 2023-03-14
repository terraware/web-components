import React from 'react';
import './styles.scss';

export interface Props {
  title?: string;
  separator?: boolean;
}

export default function NavSection(props: Props): JSX.Element {
  const { title, separator = true } = props;

  return (
    <div className='nav-section'>
      {separator && <div className='divider' />}
      {title && <span className='nav-section--title'>{title}</span>}
    </div>
  );
}
