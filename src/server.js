import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import template from './template';

const server = express();
const port = 8111;

server.use('/assets', express.static('assets'));

server.get('*', (req,res) => {
  const appString = renderToString(<App />);

  res.send(template({
    body = appString,
    title = "hello"
  });

});

server.listen(port);
