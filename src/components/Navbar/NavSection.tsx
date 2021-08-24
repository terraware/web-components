import React from 'react';
import './styles.scss';

export interface Props {
  title: string;
}

export default function NavSection(props: Props): JSX.Element {
  const { title } = props;

  return (
    <div>
      <span>{title}</span>
      <hr />
    </div>
  );
}
