import React, { type JSX } from 'react';

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
      {title && <span className={`nav-section--title ${separator ? '' : 'no-separator'}`}>{title}</span>}
    </div>
  );
}
