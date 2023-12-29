import React from 'react';
import { Theme, Toolbar, Typography } from '@mui/material';
import { isTopBarButton, TopBarButton } from '.';
import Button from '../Button/Button';
import { makeStyles } from '@mui/styles';
import Tooltip from '../Tooltip/Tooltip';

const styles = makeStyles((theme: Theme) => ({
  toolbar: {
    background: '#EDF0F1',
  },
  flexText: {
    flex: '1 1 auto',
  },
  buttonSpacing: {
    marginLeft: theme.spacing(1),
  },
}));

interface EnhancedTableToolbarProps {
  numSelected: number;
  renderNumSelectedText?: (numSelected: number) => string | JSX.Element;
  topBarButtons?: (TopBarButton | JSX.Element)[];
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps): JSX.Element | null {
  const { numSelected, renderNumSelectedText, topBarButtons } = props;
  const classes = styles();

  return renderNumSelectedText && numSelected > 0 ? (
    <Toolbar className={classes.toolbar}>
      <Typography color='inherit' variant='subtitle1' component='div' className={classes.flexText}>
        {renderNumSelectedText(numSelected)}
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
