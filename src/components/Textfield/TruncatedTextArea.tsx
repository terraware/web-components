import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

import { Link, Typography, useTheme } from '@mui/material';

import { TruncateConfig } from './Textfield';
import './styles.scss';

interface TruncatedTextAreaProps {
  truncateConfig: TruncateConfig;
  children: ReactNode;
}

const TruncatedTextArea = ({ truncateConfig, children }: TruncatedTextAreaProps) => {
  const {
    maxHeight,
    showLessText,
    showMoreText,
    showTextStyle,
    alignment = 'left',
    collapseOnBlur = false,
  } = truncateConfig;

  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);
  const [needsTruncating, setNeedsTruncating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) {
      return;
    }

    const measure = () => {
      // offsetHeight is an untransformed layout value, so it is in the same units as maxHeight
      const truncating = node.offsetHeight > maxHeight;
      setNeedsTruncating(truncating);
      if (!truncating) {
        // Otherwise content that grows long again later would start out expanded
        setShowAll(false);
      }
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);

    return () => observer.disconnect();
  }, [maxHeight]);

  const toggleShowAll = () => setShowAll((prev) => !prev);

  const containerStyle: CSSProperties = {
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    width: '100%',
  };

  if (needsTruncating && !showAll) {
    containerStyle.maxHeight = `${maxHeight}px`;
  }

  return (
    <>
      <div style={containerStyle}>
        {/* Measured separately from the container above, which clips to maxHeight when truncating */}
        <div ref={contentRef} style={{ display: 'flow-root' }}>
          {children}
        </div>
      </div>

      {needsTruncating && (
        <div style={{ width: '100%', textAlign: alignment }}>
          <Link
            component='button'
            onClick={toggleShowAll}
            onBlur={collapseOnBlur ? () => setShowAll(false) : undefined}
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
