import React, { useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab as MuiTab, useTheme } from '@mui/material';
import { useDeviceInfo } from '../../utils';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';

export type Tab = {
  icon?: IconName;
  id: string;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  tabs: Tab[];
  onTabChange?: (tab: string) => void;
  activeTab?: string;
};

const Tabs = ({ tabs, onTabChange, activeTab }: TabsProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<string>(activeTab ?? tabs[0]?.id ?? '');
  const theme = useTheme();
  const { isMobile } = useDeviceInfo();

  const tabStyles = {
    color: theme.palette.TwClrTxtSecondary as string,
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '24px',
    padding: theme.spacing(1, 2),
    minHeight: theme.spacing(4.5),
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: theme.palette.TwClrBgHover as string,
    },
    '&.Mui-selected': {
      color: theme.palette.TwClrTxtBrand as string,
    },
    '&.MuiTab-labelIcon': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    '& .MuiTab-iconWrapper': {
      fill: theme.palette.TwClrIcnSecondary as string,
      marginBottom: 0,
      marginRight: theme.spacing(1),
    },
    '&.Mui-selected .MuiTab-iconWrapper': {
      fill: theme.palette.TwClrIcnBrand as string,
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

  const setTab = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setSelectedTab(tab);
    }
  };

  useEffect(() => {
    if (activeTab !== undefined) {
      setSelectedTab(activeTab);
    }
  }, [activeTab]);

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={selectedTab}>
        <Box sx={tabHeaderProps}>
          <TabList
            variant='scrollable'
            sx={{ minHeight: theme.spacing(4.5) }}
            onChange={(unused, value: string) => setTab(value)}
            TabIndicatorProps={{
              style: {
                background: theme.palette.TwClrBgBrand,
                height: '4px',
              },
            }}
          >
            {tabs.map((tab, index) => (
              <MuiTab
                icon={tab.icon ? <Icon name={tab.icon} /> : undefined}
                label={tab.label}
                value={tab.id}
                sx={tabStyles}
                key={index}
                disabled={tab.disabled}
              />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel value={tab.id} key={index} sx={tabPanelStyles}>
            {tab.children}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Tabs;
