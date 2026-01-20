import React, { type JSX, useCallback, useEffect, useState } from 'react';

import { marked } from 'marked';

import './styles.scss';

export type MarkdownProps = {
  value: string;
};

const Markdown = ({ value }: MarkdownProps): JSX.Element => {
  const [html, setHtml] = useState<string>();

  const parseValue = useCallback(async (_value: string) => {
    const _html = await marked.parse(_value);
    setHtml(_html);
  }, []);

  useEffect(() => {
    void parseValue(value);
  }, [value]);

  return <div className='markdown' dangerouslySetInnerHTML={{ __html: html ?? '' }} />;
};

export default Markdown;
