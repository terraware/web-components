import { Props as AutocompleteProps } from "./src/components/Autocomplete";
import { Props as CancelButtonProps } from "./src/components/CancelButton";
import { Props as CheckboxProps } from "./src/components/Checkbox";
import { Props as DatePickerProps } from "./src/components/DatePicker";
import { Props as DialogCloseButtonProps } from "./src/components/DialogCloseButton";
import { Props as DivisorProps } from "./src/components/Divisor";
import { Props as DropdownProps } from "./src/components/Dropdown";
import { Props as NoteProps } from "./src/components/Note";
import { Props as RadioButtonProps } from "./src/components/RadioButton";
import { Props as SummaryBoxProps } from "./src/components/SummaryBox";
import { Props as TableProps } from "./src/components/table";
import { Props as TextFieldProps } from "./src/components/TextField";

export function Autocomplete(props: AutocompleteProps): JSX.Element;
export function CancelButton(props: CancelButtonProps): JSX.Element;
export function Checkbox(props: CheckboxProps): JSX.Element;
export function DatePicker(props: DatePickerProps): JSX.Element;
export function DialogCloseButton(props: DialogCloseButtonProps): JSX.Element;
export function Divisor(props: DivisorProps): JSX.Element;
export function Dropdown(props: DropdownProps): JSX.Element;
export function Note(props: NoteProps): JSX.Element;
export function RadioButton(props: RadioButtonProps): JSX.Element;
export function SummaryBox(props: SummaryBoxProps): JSX.Element;
export function TextArea(props: TextFieldProps): JSX.Element;
export function TextField(props: TextFieldProps): JSX.Element;
export function Table<T>(props: TableProps<T>): JSX.Element;
