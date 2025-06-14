import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab as MuiTab, SxProps, Theme, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useDeviceInfo } from '../../utils';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';

export type Tab = {
  children: React.ReactNode;
  disabled?: boolean;
  icon?: IconName;
  id: string;
  label: string;
};

export type TabsProps = {
  activeTab?: string;
  onChangeTab?: (tab: string) => void;
  tabs: Tab[];
  tabStyle?: SxProps<Theme>;
  headerBorder?: boolean;
};

const Tabs = ({ activeTab, onChangeTab, tabs, tabStyle, headerBorder = false }: TabsProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<string>(activeTab ?? tabs[0]?.id ?? '');
  const theme = useTheme();
  const { isMobile } = useDeviceInfo();

  const tabStyles = [
    {
      color: theme.palette.TwClrTxtSecondary as string,
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '24px',
      minHeight: theme.spacing(4.5),
      padding: theme.spacing(1, 2),
      textTransform: 'capitalize',
      '&:hover': {
        backgroundColor: theme.palette.TwClrBgHover as string,
      },
      '&.Mui-selected': {
        color: theme.palette.TwClrTxtBrand as string,
      },
      '&.MuiTab-labelIcon': {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      },
      '& .MuiTab-iconWrapper': {
        fill: theme.palette.TwClrIcnSecondary as string,
        marginBottom: 0,
        marginRight: theme.spacing(1),
      },
      '&.Mui-selected .MuiTab-iconWrapper': {
        fill: theme.palette.TwClrIcnBrand as string,
      },
    },
    ...(Array.isArray(tabStyle) ? tabStyle : [tabStyle]),
  ];

  const tabHeaderProps = {
    borderBottom: headerBorder ? 1 : 0,
    borderColor: 'divider',
    margin: isMobile ? 0 : theme.spacing(0, 4),
  };

  const tabPanelStyles = {
    padding: 0,
  };

  const setTab = (tab: string) => {
    if (onChangeTab) {
      onChangeTab(tab);
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
            onChange={(unused, value: string) => setTab(value)}
            sx={{ minHeight: theme.spacing(4.5) }}
            TabIndicatorProps={{
              style: {
                background: theme.palette.TwClrBgBrand,
                height: '4px',
              },
            }}
            variant={'scrollable'}
          >
            {tabs.map((tab, index) => (
              <MuiTab
                disabled={tab.disabled}
                icon={tab.icon ? <Icon name={tab.icon} /> : undefined}
                key={index}
                label={tab.label}
                sx={tabStyles}
                value={tab.id}
              />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel key={index} sx={tabPanelStyles} value={tab.id}>
            {tab.children}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Tabs;
