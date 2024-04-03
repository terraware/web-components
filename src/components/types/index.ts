export type DropdownItem = {
  label: string;
  value: any;
  onClick?: () => void;
  fontStyle?: 'italic' | 'normal' | 'oblique';
  fontWeight?: 'bold' | 'normal';
  type?: 'passive' | 'destructive';
  disabled?: boolean;
};
