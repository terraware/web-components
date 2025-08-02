import React from 'react';

import { Box, Tooltip, Typography, useTheme } from '@mui/material';

import { useDeviceInfo } from '../../utils';
import AntSwitch from '../AntSwitch';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';

export type MapLegendIcon = {
  iconColor: string;
  iconName: IconName;
  iconOpacity?: number;
  type: 'icon';
};

export type MapLegendFill = {
  borderColor: string;
  fillColor?: string;
  fillPatternUrl?: string;
  opacity?: number;
  type: 'fill';
};

export type MapLayerItem = {
  disabled?: boolean;
  id: string;
  label: string;
  style: MapLegendIcon | MapLegendFill;
};

export type MapLayerGroup = {
  type: 'layer';
  items: MapLayerItem[];
  setSelectedLayer: (id: string) => void;
  selectedLayer: string;
};

export type MapMarkerItem = {
  disabled?: boolean;
  id: string;
  label: string;
  icon: MapLegendIcon;
  setVisible?: (visible: boolean) => void;
  visible: boolean;
};

export type MapMarkerGroup = {
  type: 'marker';
  items: MapMarkerItem[];
};

export type MapHighlightItem = {
  label: string;
  style: MapLegendIcon | MapLegendFill;
};

export type MapHighlightGroup = {
  type: 'highlight';
  items: MapHighlightItem[];
  setVisible?: (visible: boolean) => void;
  visible: boolean;
};

export type MapLegendGroup = {
  disabled?: boolean;
  tooltip?: string;
  title: string;
} & (MapMarkerGroup | MapLayerGroup | MapHighlightGroup);

export type MapLegendProps = {
  legends: MapLegendGroup[];
};

const MapLegend = ({ legends }: MapLegendProps): JSX.Element => {
  const theme = useTheme();
  const { isMobile, isDesktop } = useDeviceInfo();

  const legendComponents = legends.map((legend, index) => {
    const isFirst = index === 0;
    const isLast = index === legends.length - 1;
    const switchComponent =
      legend.type === 'highlight' ? (
        <AntSwitch disabled={legend.disabled} checked={legend.visible} onChange={legend.setVisible} />
      ) : undefined;

    const titleComponent = (
      <Typography
        fontSize='16px'
        fontWeight={600}
        width={isMobile ? '100%' : undefined}
        marginRight={isMobile ? 0 : theme.spacing(4)}
        paddingLeft={switchComponent ? theme.spacing(1) : theme.spacing(0)}
      >
        {legend.title}
        {legend.tooltip && (
          <Tooltip
            title={legend.tooltip}
            sx={{
              display: 'inline-block',
              verticalAlign: 'text-top',
              marginLeft: theme.spacing(1),
            }}
          >
            <Box display='flex'>
              <Icon fillColor={theme.palette.TwClrIcnInfo} name='info' size='small' />
            </Box>
          </Tooltip>
        )}
      </Typography>
    );

    const itemComponents = legend.items.map((item, itemIndex) => {
      const onClick = legend.disabled
        ? undefined
        : legend.type === 'layer'
        ? (item as MapLayerItem).disabled
          ? undefined
          : () => legend.setSelectedLayer((item as MapLayerItem).id)
        : legend.type === 'marker'
        ? (item as MapMarkerItem).disabled
          ? undefined
          : () => (item as MapMarkerItem).setVisible?.(!(item as MapMarkerItem).visible)
        : undefined;

      const disabled =
        legend.disabled ||
        (legend.type === 'layer'
          ? (item as MapLayerItem).disabled
          : legend.type === 'marker'
          ? (item as MapMarkerItem).disabled
          : false) ||
        false;

      const selected =
        legend.type === 'layer'
          ? (item as MapLayerItem).id === legend.selectedLayer
          : legend.type === 'marker'
          ? (item as MapMarkerItem).visible
          : false;

      const logoComponent = () => {
        switch (legend.type) {
          case 'marker':
            const featureItem = item as MapMarkerItem;

            return (
              <Icon
                name={featureItem.icon.iconName}
                fillColor={featureItem.icon.iconColor}
                style={{ marginRight: theme.spacing(1), opacity: featureItem.icon.iconOpacity }}
                size={'small'}
              />
            );
          case 'layer':
          case 'highlight':
            const layerItem = item as MapHighlightItem | MapLayerItem;

            if (layerItem.style.type === 'icon') {
              return (
                <Icon
                  name={layerItem.style.iconName}
                  fillColor={layerItem.style.iconColor}
                  style={{ marginRight: theme.spacing(1), opacity: layerItem.style.iconOpacity }}
                  size={'small'}
                />
              );
            } else {
              const opacity = layerItem.style.opacity ?? 1.0;
              return (
                <Box
                  sx={{
                    border: `2px solid ${layerItem.style.borderColor}`,
                    backgroundColor: layerItem.style.fillColor,
                    backgroundImage: layerItem.style.fillPatternUrl
                      ? `url('${layerItem.style.fillPatternUrl}')`
                      : undefined,
                    backgroundRepeat: 'repeat',
                    opacity: disabled ? 0.7 * opacity : opacity,
                    height: '16px',
                    width: '24px',
                    minWidth: '24px',
                    marginRight: theme.spacing(1),
                  }}
                />
              );
            }
        }
      };

      const visibleComponent = () => {
        switch (legend.type) {
          case 'marker':
            const featureItem = item as MapMarkerItem;

            const visibleIcon = featureItem.visible ? <Icon name='iconEye' /> : <Icon name='iconEyeOff' />;

            return <Box display='flex'>{visibleIcon}</Box>;
          case 'layer':
            const layerLegend = legend as MapLayerGroup;
            const layerItem = item as MapLayerItem;

            return (
              <Box
                display='flex'
                sx={{ visibility: layerItem.id === layerLegend.selectedLayer ? 'visible' : 'hidden' }}
              >
                <Icon name='checkmark' style={{ marginRight: theme.spacing(1) }} />
              </Box>
            );

          case 'highlight':
            return undefined;
        }
      };

      return (
        <Box
          onClick={onClick}
          display='flex'
          alignItems='center'
          sx={{
            cursor: onClick ? 'pointer' : 'default',
            background: selected ? theme.palette.TwClrBgSecondary : 'none',
            borderRadius: theme.spacing(1),
            padding: theme.spacing(1, 1),
            opacity: disabled ? '0.5' : 1,
          }}
          justifyContent={'space-between'}
          key={`${index}-${itemIndex}`}
        >
          <Box display='flex' alignItems='center' paddingRight={theme.spacing(1)}>
            {logoComponent()}
            <Typography fontSize='14px' fontWeight={400}>
              {item.label}
            </Typography>
          </Box>
          <Box display='flex'>{visibleComponent()}</Box>
        </Box>
      );
    });

    return (
      <Box
        key={legend.title}
        sx={{ opacity: legend.disabled ? 0.7 : 1 }}
        borderBottom={isLast ? 'none' : `1px solid ${theme.palette.TwClrBrdrTertiary}`}
      >
        <Box paddingBottom={2} paddingTop={isFirst ? 0 : 2} flexDirection={'column'}>
          <Box display='flex' alignItems={'center'} paddingLeft={theme.spacing(1)}>
            {switchComponent}
            {titleComponent}
          </Box>

          {itemComponents}
        </Box>
      </Box>
    );
  });

  return (
    <Box
      display='flex'
      justifyItems='flex-start'
      padding={theme.spacing(2, 1)}
      flexDirection={'column'}
      maxWidth={isDesktop ? '184px' : 'fill'}
      width={isDesktop ? 'auto' : 'fill'}
      margin={0}
    >
      {legendComponents}
    </Box>
  );
};

export default MapLegend;
