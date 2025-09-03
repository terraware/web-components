import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { Link, Typography, useTheme } from '@mui/material';

import { TruncateConfig } from './Textfield';
import './styles.scss';

interface TruncatedTextAreaProps {
  truncateConfig: TruncateConfig;
  children: ReactNode;
}

const TruncatedTextArea = ({ truncateConfig, children }: TruncatedTextAreaProps) => {
  const { maxHeight, showLessText, showMoreText, showTextStyle, alignment = 'left' } = truncateConfig;

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

  const divStyle: Record<string, any> = {
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    width: '100%',
  };

  if (needsTruncating && !showAll) {
    divStyle.maxHeight = `${maxHeight}px`;
  }

  return (
    <>
      <div ref={ref} style={divStyle}>
        {children}
      </div>

      {needsTruncating && (
        <div style={{ width: '100%', textAlign: alignment }}>
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
