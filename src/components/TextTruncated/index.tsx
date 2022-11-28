import { Link, Theme, Tooltip, Typography, useTheme } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: `${theme.palette.TwClrBg} !important`,
    '&:before': {
      border: `1px solid ${theme.palette.TwClrBrdrTertiary}`
    },
  },
  tooltip: {
    backgroundColor: `${theme.palette.TwClrBg} !important`,
    color: `${theme.palette.TwClrTxt} !important`,
    border: `1px solid ${theme.palette.TwClrBrdrTertiary} !important`,
    borderRadius: '8px !important',
    boxShadow: `0px 3px 3px ${theme.palette.TwClrBaseGray100}`,
    padding: '8px',
  },
}));

/**
 * Represents the result of truncating the string list
 * text: the text to display before the '...# more' link
 * numberMore: the number to display in the '...# more' link
 *   has two special values
 *   0: the full text can be displayed; do not show '...# more'
 *   -1: the list is of length one but the element cannot be fully
 *       displayed. show '...more' without a '#'
 */
interface TextDisplay {
  text: string;
  numberMore: number;
}

/**
 * Compute TextDisplay for a list of strings
 * @param strings list of strings to process
 * @param maxLength max displayable length
 */
function computeFromStringList(
  strings: string[],
  maxLength: number,
): TextDisplay {
  if (strings[0].length > maxLength) {
    // case in which the first string is too long to fit by itself
    return {
      text: strings[0].substring(0, maxLength),
      numberMore: strings.length === 1 ? -1 : strings.length - 1
    };
  }

  // concatenate strings with ', ' and stop before exceeding max
  let stringsRemaining = strings.length - 1;
  let result = strings[0];
  for (let i = 1; i < strings.length; i++) {
    const tempResult = [result, strings[i]].join(', ');
    if (tempResult.length > maxLength) {
      break;
    }
    stringsRemaining--;
    result = tempResult;
  }

  return {
    text: result,
    numberMore: stringsRemaining,
  };
}

export interface Props {
  stringList: string[];
  maxLengthPx: number;
  moreSeparator?: string;
  moreText?: string;
  textStyle?: Record<string, any>;
  showAllStyle?: Record<string, any>;
}

export default function TextTruncated(props: Props): JSX.Element {
  const {
    stringList,
    maxLengthPx,
    moreSeparator = '... ',
    moreText = 'more',
    textStyle,
    showAllStyle,
  } = props;
  const [showAllOpen, setShowAllOpen] = useState(false);
  const classes = useStyles();
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>();
  const theme = useTheme();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    setCanvasContext(canvas?.getContext('2d') ?? undefined);
  }, []);

  const pixelsPerChar = useMemo(() => {
    // compute the pixels per character, averaged over the comma-separated joined stringList
    const fullText = stringList.join(', ');
    let result = 0;
    if (canvasContext) {
      const fontSize = (textStyle && textStyle.fontSize) || theme.typography.fontSize;
      const fontFamily = (textStyle && textStyle.fontFamily) || theme.typography.fontFamily;

      canvasContext.font = `${fontSize}px ${fontFamily}`;
      result = canvasContext.measureText(fullText).width;
    }

    return result / fullText.length;
  }, [stringList, textStyle, canvasContext]);

  let maxExcludingSuffix = stringList.join(', ').length;
  if (pixelsPerChar > 0) {
    const maxChars = maxLengthPx / pixelsPerChar;
    maxExcludingSuffix =
      maxChars - moreSeparator.length - moreText.length - 1 - Math.ceil(Math.log10(stringList.length));
  }
  const textToDisplay = computeFromStringList(stringList, maxExcludingSuffix);

  return (
    <Typography sx={textStyle}>
      {textToDisplay.text}{textToDisplay.numberMore !== 0 ? moreSeparator : ''}
      {textToDisplay.numberMore !== 0
        ? (<Tooltip
            arrow={true}
            classes={{
              arrow: classes.arrow,
              tooltip: classes.tooltip,
            }}
            open={showAllOpen}
            title={(
              <Typography sx={showAllStyle}>
                {stringList.join(', ')}
              </Typography>
            )}
          >
            <Link
              component='button'
              onClick={() => setShowAllOpen(!showAllOpen)}
              onBlur={() => setShowAllOpen(false)}
              sx={{color: theme.palette.TwClrTxtBrand, textDecorationColor: `${theme.palette.TwClrTxtBrand}80`}}
            >
              <Typography sx={{...textStyle, marginTop: '-3px'}}>{
                (textToDisplay.numberMore > 0 ? textToDisplay.numberMore + ' ' : '') + moreText
              }</Typography>
            </Link>
          </Tooltip>
        )
        : null
      }
    </Typography>
  );
}
