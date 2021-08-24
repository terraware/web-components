import React from 'react';
import './styles.scss';

export interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function SubNavbar(props: Props): JSX.Element {
  const { children } = props;

  return <div>{children}</div>;
}
