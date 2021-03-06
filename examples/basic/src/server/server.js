import Express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';
import {StaticRouter} from 'react-router-dom';
import App from '../universal/app';

const PORT = 3000;
const app = Express();

app.use('/dist', Express.static('dist', {maxAge: '1d'}));

app.use((req, res) => {
  const html = `<!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <title>React Site Nav - Basic</title>
                      </head>
                      <body style="margin:0;background: #F6F9FC;">
                        <div id="reactDiv">${renderToString(
    <StaticRouter
      location={req.url}
      context={{}}>
      <App/>
    </StaticRouter>)}
                        </div>
                        <script type="application/javascript" src="http://localhost:3002/dist/bundle.js"></script>
                      </body>
                    </html>`;

  res.end(html);
});

const httpServer = app.listen(PORT, () => {
  console.log(`Example app listening at ${PORT}...`);
});

// export httpServer object so universal-hot-reload can access it
module.exports = httpServer;
