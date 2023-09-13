export type DropdownItem<T = string> = {
  label: string;
  value: T;
  onClick?: () => void;
  type?: 'passive' | 'destructive';
};
