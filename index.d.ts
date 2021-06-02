declare module "web-components";

export interface Autocomplete {
  id: string;
  label: string;
  values: string[];
  onChange: (id: string, value: string) => void;
  selected: string | undefined;
}
