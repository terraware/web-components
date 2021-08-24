import React from 'react';
import './styles.scss';

export interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Navbar(props: Props): JSX.Element {
  const { children } = props;

  return <div>{children}</div>;
}
