export type DropdownItem<T = any> = {
  label: string;
  value: T;
  onClick?: () => void;
  type?: 'passive' | 'destructive';
};
