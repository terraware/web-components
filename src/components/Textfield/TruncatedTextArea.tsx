import React, { useEffect, useRef, useState } from 'react';
import { TruncateConfig } from './Textfield';
import { Link, Typography, useTheme } from '@mui/material';

interface TruncatedTextAreaProps {
  preserveNewlines?: boolean;
  truncateConfig: TruncateConfig;
  value?: string | number;
}

const TruncatedTextArea = ({ preserveNewlines, truncateConfig, value }: TruncatedTextAreaProps) => {
  const { maxHeight, showLessText, showMoreText, showTextStyle, valueTextStyle } = truncateConfig;

  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);
  const [needsTruncating, setNeedsTruncating] = useState(false);
  const [totalHeight, setTotalHeight] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (ref && ref.current && !totalHeight) {
      const height = ref.current.clientHeight;
      setTotalHeight(height);
      setNeedsTruncating(height > maxHeight);
    }
  }, [maxHeight, ref, totalHeight]);

  const toggleShowAll = () => setShowAll((prev) => !prev);

  const textStyle: Record<string, any> = {
    ...valueTextStyle,
    margin: '8px 0',
    padding: 0,
    overflow: 'hidden',
    width: '100%',
  };

  if (needsTruncating && !showAll) {
    textStyle.maxHeight = `${maxHeight}px`;
  }

  return (
    <>
      <p
        ref={ref}
        className={`textfield-value--display${preserveNewlines ? ' preserve-newlines' : ''}`}
        style={textStyle}
      >
        {value}
      </p>

      {needsTruncating && (
        <div style={{ width: '100%' }}>
          <Link
            component='button'
            onClick={toggleShowAll}
            onBlur={() => setShowAll(false)}
            sx={{ color: theme.palette.TwClrTxtBrand, textDecorationColor: `${theme.palette.TwClrTxtBrand}80` }}
          >
            <Typography sx={{ ...showTextStyle, marginTop: '-3px' }}>
              {showAll ? showLessText : showMoreText}
            </Typography>
          </Link>
        </div>
      )}
    </>
  );
};

export default TruncatedTextArea;
