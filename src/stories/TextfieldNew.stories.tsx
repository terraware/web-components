import React from 'react';

import { Box } from '@mui/material';
import { Story } from '@storybook/react';

import TextField, { Props as TextFieldProps } from '../components/Textfield/Textfield';

export default {
  title: 'TextField New',
  component: TextField,
  argTypes: {
    iconLeft: {
      options: ['search', 'chevronDown', null],
      control: { type: 'radio' },
    },
    iconRight: {
      options: ['calendar', 'chevronDown', 'cancel', null],
      control: { type: 'radio' },
    },
    maxLength: {
      control: { type: 'number' },
    },
    type: {
      options: ['text', 'textarea'],
      control: { type: 'radio' },
    },
  },
};

const Template: Story<TextFieldProps> = (args) => {
  const [value, setValue] = React.useState(args.value ?? 0);
  const handleChange = (v: unknown) => {
    setValue(v as string);
  };

  return (
    <Box sx={{ marginTop: '30px' }} width='500px'>
      <TextField {...args} value={value} onChange={handleChange} />
    </Box>
  );
};

const NumberTemplate: Story<TextFieldProps> = (args) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (v: unknown) => {
    setValue(v as number);
  };

  return (
    <Box sx={{ marginTop: '30px' }}>
      <TextField {...args} value={value} onChange={handleChange} type='number' />
    </Box>
  );
};

export const Default = Template.bind({});

export const WithTooltip = Template.bind({});

export const TextArea = Template.bind({});

export const TextAreaWithMarkdown = Template.bind({});

export const TextAreaWithTruncate = Template.bind({});

export const NumberField = NumberTemplate.bind({});

Default.args = {
  label: 'Field Label',
  disabled: false,
  helperText: 'Help text.',
  placeholder: 'Placeholder...',
  errorText: '',
  warningText: '',
  readonly: false,
  display: false,
  markdown: false,
  type: 'text',
  autoFocus: false,
  preserveNewlines: false,
};

WithTooltip.args = {
  label: 'Field Label',
  disabled: false,
  helperText: 'Help text.',
  placeholder: 'Placeholder...',
  errorText: '',
  warningText: '',
  readonly: false,
  display: false,
  markdown: false,
  type: 'text',
  tooltipTitle: 'Hello world!',
  autoFocus: false,
  preserveNewlines: false,
};

TextArea.args = {
  label: 'Field Label',
  disabled: false,
  helperText: 'Help text.',
  placeholder: 'Placeholder...',
  errorText: '',
  warningText: '',
  readonly: false,
  display: false,
  markdown: false,
  type: 'textarea',
  autoFocus: false,
  preserveNewlines: true,
};

TextAreaWithMarkdown.args = {
  label: 'Field Label',
  disabled: false,
  helperText: 'Help text.',
  placeholder: 'Placeholder...',
  errorText: '',
  warningText: '',
  readonly: false,
  display: true,
  markdown: true,
  type: 'textarea',
  autoFocus: false,
  preserveNewlines: true,
  value: `\
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://terraware.io)

Autoconverted link http://terraware.io
`,
};

TextAreaWithTruncate.args = {
  label: 'Field Label',
  disabled: false,
  helperText: 'Help text.',
  placeholder: 'Placeholder...',
  errorText: '',
  warningText: '',
  readonly: false,
  display: false,
  markdown: false,
  type: 'textarea',
  autoFocus: false,
  preserveNewlines: true,
  truncateConfig: {
    maxHeight: 48,
    showLessText: 'Show less',
    showMoreText: 'Show more',
  },
};

NumberField.args = {
  label: 'Number Label',
  disabled: false,
  helperText: 'Help text.',
  placeholder: 'Placeholder...',
  errorText: '',
  warningText: '',
  readonly: false,
  display: false,
  markdown: false,
  min: 5,
  max: 25,
  autoFocus: false,
  preserveNewlines: false,
};
