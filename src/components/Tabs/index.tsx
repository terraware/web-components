import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, useTheme } from '@mui/material';
import { useDeviceInfo } from '../../utils';

export type Tab = {
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  tabs: Tab[];
};

const Tabs = ({ tabs }: TabsProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].label ?? '');
  const theme = useTheme();
  const { isMobile } = useDeviceInfo();

  const tabStyles = {
    fontSize: '14px',
    padding: theme.spacing(1, 2),
    minHeight: theme.spacing(4.5),
    textTransform: 'capitalize',
    '&.Mui-selected': {
      color: theme.palette.TwClrTxtBrand as string,
      fontWeight: 500,
    },
  };

  const tabHeaderProps = {
    borderBottom: 1,
    borderColor: 'divider',
    margin: isMobile ? 0 : theme.spacing(0, 4),
  };

  const tabPanelStyles = {
    padding: 0,
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={selectedTab}>
        <Box sx={tabHeaderProps}>
          <TabList
            variant='scrollable'
            sx={{ minHeight: theme.spacing(4.5) }}
            onChange={(unused, value: string) => setSelectedTab(value)}
            TabIndicatorProps={{
              style: {
                background: theme.palette.TwClrBgBrand,
                height: '4px',
                borderRadius: '4px 4px 0 0',
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab label={tab.label} value={tab.label} sx={tabStyles} key={index} disabled={tab.disabled} />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel value={tab.label} key={index} sx={tabPanelStyles}>
            {tab.children}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Tabs;
