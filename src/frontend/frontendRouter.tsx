import { Router } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import { App, SSRApp } from './components';

export const frontendRouter = Router();

frontendRouter.get('/', (req, res, next) => {
  const styleSheet = new ServerStyleSheet();
  const markup =
    '<!DOCTYPE html>' +
    renderToString(
      styleSheet.collectStyles(
        <SSRApp>
          <App />
        </SSRApp>,
      ),
    );

  const style = styleSheet.getStyleTags();
  const output = markup.replace(/<style>\/\* styledComponentsElement \*\/<\/style>/, style);

  res.send(output);
});
