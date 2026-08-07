import React, { type CSSProperties, type JSX, useCallback, useEffect, useState } from 'react';

import { marked } from 'marked';

import './styles.scss';

export type MarkdownProps = {
  value: string;
  style?: CSSProperties;
};

const Markdown = ({ value, style }: MarkdownProps): JSX.Element => {
  const [html, setHtml] = useState<string>();

  const parseValue = useCallback(async (_value: string) => {
    const _html = await marked.parse(_value);
    setHtml(_html);
  }, []);

  useEffect(() => {
    void parseValue(value);
  }, [parseValue, value]);

  return <div className='markdown' style={style} dangerouslySetInnerHTML={{ __html: html ?? '' }} />;
};

export default Markdown;
