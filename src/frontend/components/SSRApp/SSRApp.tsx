import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export const SSRApp: FunctionComponent = ({ children }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>HomeApp</title>
      <style>{'/* styledComponentsElement */'}</style>
    </head>
    <Body>
      <div id="app">{children}</div>
      <script src="/app.js" />
    </Body>
  </html>
);

const Body = styled.body`
  background: #f7fdff;
`;
