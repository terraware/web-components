export type DropdownItem = {
  label: string;
  value: any;
  onClick?: () => void;
  type?: 'passive' | 'destructive';
  disabled?: boolean;
};
