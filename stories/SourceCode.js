import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

export default ({ customStyle = {}, children }) => (
  <SyntaxHighlighter
    customStyle={{ backgroundColor: 'transparent', paddingBottom: 320, display: 'inline-block', ...customStyle }}
    language="jsx"
  >
    {children}
  </SyntaxHighlighter>
)
