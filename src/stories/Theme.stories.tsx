import { Story } from '@storybook/react';
import { Box, useTheme } from '@mui/material';
import React from 'react';
import Select from '../components/Select/Select';
import TerrawareTheme from '../style-dictionary-dist/TerrawareTheme';

export default {
  title: 'Theme',
  component: Box,
};

const COLORS = Object.keys(TerrawareTheme.palette);

const Template: Story<{}> = () => {
  const theme = useTheme();
  const [colorValue, setColorValue] = React.useState(theme.palette.TwClrIcnBrand);
  const [colorStr, setColorStr] = React.useState('');
  const [bgColorValue, setBgColorValue] = React.useState(theme.palette.TwClrBgBrandTertiary);
  const [bgColorStr, setBgColorStr] = React.useState('');
  const palette = theme.palette as unknown as { [key: string]: string };

  const handleChangeColor = (str: string) => {
    setColorStr(str);
    setColorValue(palette[str] || (palette[COLORS[0]] as string));
  };

  const handleChangeBgColor = (str: string) => {
    setBgColorStr(str);
    setBgColorValue(palette[str] as string);
  };

  return (
    <Box width={500}>
      <Box
        sx={{
          color: colorValue,
          backgroundColor: bgColorValue,
          border: '1px solid black',
          marginBottom: '25px',
        }}
        width={500}
        height={200}
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        The quick brown fox jumped over the silly lazy goat!
      </Box>
      <Select selectedValue={colorStr} label='Color' onChange={handleChangeColor} options={COLORS} fullWidth={true} />
      <Box sx={{ marginBottom: '25px' }} />
      <Select
        selectedValue={bgColorStr}
        label='BgColor'
        onChange={handleChangeBgColor}
        options={COLORS}
        fullWidth={true}
      />
    </Box>
  );
};

export const Default = Template.bind({});
