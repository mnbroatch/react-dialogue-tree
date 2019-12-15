import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

export default props => (
  <SyntaxHighlighter
    customStyle={{ backgroundColor: 'transparent', paddingBottom: 320 }}
    language="jsx"
  >
    {props.children}
  </SyntaxHighlighter>
)
