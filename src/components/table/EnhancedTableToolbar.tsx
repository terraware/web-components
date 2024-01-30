import React, { useMemo } from 'react';
import { Link, Theme, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isTopBarButton, TopBarButton } from '.';
import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';
import { EnhancedTopBarSelectionConfig } from './EnhancedTableToolbarV2';

const styles = makeStyles((theme: Theme) => ({
  toolbar: {
    background: theme.palette.TwClrBgSecondary,
    borderRadius: theme.spacing(0.5),
  },
  flexText: {
    flex: '1 1 auto',
  },
  buttonSpacing: {
    marginLeft: theme.spacing(1),
  },
  selectLink: {
    color: theme.palette.TwClrTxtBrand,
    cursor: 'pointer',
  },
}));

interface EnhancedTableToolbarProps {
  isAllSelected?: boolean;
  numSelected: number;
  renderNumSelectedText?: (numSelected: number) => string;
  topBarButtons?: (TopBarButton | JSX.Element)[];
  topBarSelectionConfig?: EnhancedTopBarSelectionConfig;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps): JSX.Element | null {
  const { isAllSelected, numSelected, renderNumSelectedText, topBarButtons, topBarSelectionConfig } = props;
  const classes = styles();

  const topBarSelection = useMemo(() => {
    if (!renderNumSelectedText) {
      return null;
    }

    if (!topBarSelectionConfig) {
      return renderNumSelectedText(numSelected);
    }

    const { handleSelectAll, handleSelectNone, renderSelectAllText, renderSelectNoneText, renderEnhancedNumSelectedText } = topBarSelectionConfig;

    return (
      <>
        {renderEnhancedNumSelectedText ? renderEnhancedNumSelectedText() : renderNumSelectedText(numSelected)}{' '}
        {!isAllSelected && handleSelectAll && renderSelectAllText && (
          <Link className={classes.selectLink} onClick={handleSelectAll}>
            {renderSelectAllText()}
          </Link>
        )}
        {isAllSelected && handleSelectNone && renderSelectNoneText && (
          <Link className={classes.selectLink} onClick={handleSelectNone}>
            {renderSelectNoneText()}
          </Link>
        )}
      </>
    );
  }, [renderNumSelectedText, topBarSelectionConfig, numSelected]);

  return renderNumSelectedText && numSelected > 0 ? (
    <Toolbar className={classes.toolbar}>
      <Typography color='inherit' variant='subtitle1' component='div' className={classes.flexText}>
        {topBarSelection}
      </Typography>
      {topBarButtons?.map((tbButton: TopBarButton | JSX.Element, index) =>
        isTopBarButton(tbButton) ? (
          <Tooltip title={tbButton.tooltipTitle} key={index}>
            <Button
              className={classes.buttonSpacing}
              key={tbButton.buttonText}
              label={tbButton.buttonText}
              priority='secondary'
              type={tbButton.buttonType}
              onClick={tbButton.onButtonClick}
              icon={tbButton.icon}
              disabled={tbButton.disabled}
            />
          </Tooltip>
        ) : (
          tbButton
        )
      )}
    </Toolbar>
  ) : null;
}
