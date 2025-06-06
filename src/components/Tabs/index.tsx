import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab as MuiTab, SxProps, Theme, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useDeviceInfo } from '../../utils';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';

const makeTabSessionKey = (viewIdentifier: string) => `tab-${viewIdentifier}`;

const getTabFromSession = (viewIdentifier: string): string => {
  try {
    return sessionStorage.getItem(makeTabSessionKey(viewIdentifier)) || '';
  } catch (e) {
    return '';
  }
};

const writeTabToSession = (viewIdentifier: string, tab: string): void => {
  try {
    sessionStorage.setItem(makeTabSessionKey(viewIdentifier), tab);
  } catch (e) {
    /* empty */
  }
};

export type Tab = {
  children: React.ReactNode;
  disabled?: boolean;
  icon?: IconName;
  id: string;
  label: string;
};

export type TabsProps = {
  activeTab?: string;
  headerBorder?: boolean;
  onTabChange?: (tab: string) => void;
  sessionViewId?: string;
  tabs: Tab[];
  tabStyle?: SxProps<Theme>;
};

const Tabs = ({
  activeTab,
  headerBorder = false,
  onTabChange,
  sessionViewId,
  tabs,
  tabStyle,
}: TabsProps): JSX.Element => {
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

  const setTab = useCallback(
    (tab: string) => {
      if (onTabChange) {
        onTabChange(tab);

        return;
      }

      setSelectedTab(tab);
      if (sessionViewId) {
        writeTabToSession(sessionViewId, tab);
      }
    },
    [onTabChange, sessionViewId, setSelectedTab]
  );

  // get previous session tab, if sessionViewId is provided
  const prevSessionTab = useMemo(() => (sessionViewId ? getTabFromSession(sessionViewId) : undefined), [sessionViewId]);

  // restore previous session tab, if available
  useEffect(() => {
    if (prevSessionTab) {
      setSelectedTab(prevSessionTab);
    }
  }, [prevSessionTab]);

  // write tab to session when selectedTab changes
  useEffect(() => {
    if (sessionViewId && selectedTab && selectedTab !== prevSessionTab) {
      writeTabToSession(sessionViewId, selectedTab);
    }
  }, [prevSessionTab, selectedTab, sessionViewId]);

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
