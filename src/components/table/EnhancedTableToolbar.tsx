import React, { useMemo } from 'react';
import { Link, Toolbar, Typography, useTheme } from '@mui/material';
import { isTopBarButton, TopBarButton } from '.';
import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';
import { EnhancedTopBarSelectionConfig } from './EnhancedTableToolbarV2';

interface EnhancedTableToolbarProps {
  isAllSelected?: boolean;
  numSelected: number;
  renderNumSelectedText?: (numSelected: number) => string;
  topBarButtons?: (TopBarButton | JSX.Element)[];
  topBarSelectionConfig?: EnhancedTopBarSelectionConfig;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps): JSX.Element | null {
  const { isAllSelected, numSelected, renderNumSelectedText, topBarButtons, topBarSelectionConfig } = props;
  const theme = useTheme();

  const selectLinkStyles = {
    color: theme.palette.TwClrTxtBrand,
    cursor: 'pointer',
  };

  const topBarSelection = useMemo(() => {
    if (!renderNumSelectedText) {
      return null;
    }

    if (!topBarSelectionConfig) {
      return renderNumSelectedText(numSelected);
    }

    const {
      handleSelectAll,
      handleSelectNone,
      renderSelectAllText,
      renderSelectNoneText,
      renderEnhancedNumSelectedText,
    } = topBarSelectionConfig;

    return (
      <>
        {renderEnhancedNumSelectedText ? renderEnhancedNumSelectedText() : renderNumSelectedText(numSelected)}{' '}
        {!isAllSelected && handleSelectAll && renderSelectAllText && (
          <Link onClick={handleSelectAll} sx={selectLinkStyles}>
            {renderSelectAllText()}
          </Link>
        )}
        {isAllSelected && handleSelectNone && renderSelectNoneText && (
          <Link onClick={handleSelectNone} sx={selectLinkStyles}>
            {renderSelectNoneText()}
          </Link>
        )}
      </>
    );
  }, [renderNumSelectedText, topBarSelectionConfig, numSelected]);

  return renderNumSelectedText && numSelected > 0 ? (
    <Toolbar
      sx={{
        background: theme.palette.TwClrBgSecondary,
        borderRadius: theme.spacing(0.5),
      }}
    >
      <Typography color='inherit' variant='subtitle1' component='div' sx={{ flex: '1 1 auto' }}>
        {topBarSelection}
      </Typography>
      {topBarButtons?.map((tbButton: TopBarButton | JSX.Element, index) =>
        isTopBarButton(tbButton) ? (
          <Tooltip title={tbButton.tooltipTitle} key={index}>
            <Button
              key={tbButton.buttonText}
              label={tbButton.buttonText}
              priority='secondary'
              type={tbButton.buttonType}
              onClick={tbButton.onButtonClick}
              icon={tbButton.icon}
              disabled={tbButton.disabled}
              sx={{ marginLeft: theme.spacing(1) }}
            />
          </Tooltip>
        ) : (
          tbButton
        )
      )}
    </Toolbar>
  ) : null;
}
