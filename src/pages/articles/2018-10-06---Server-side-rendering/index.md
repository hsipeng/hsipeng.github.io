---
title: React Server Rendering
date: "2018-10-06T22:40:32.169Z"
layout: post
draft: false
path: "/posts/React-Server-Rendering/"
category: "Javascript"
tags:
  - "react"
  - "Javascript"
  - "Web Development"
  - "SSR"
description: "An Essay on how to config react server side rendering with express or koa, just a simple demo for you, wish you enjoy.."
---



Hello , I'am lirawx. In this article I will show you how to change a react project to react server rendering with some simple steps.  source code on GitHub 
[GitHub - lirawx/react-starter-kit at ssr](https://github.com/lirawx/react-starter-kit/tree/ssr)
## environment


- react 16
- webpack 4
- router 4
- babel 7
- ...


## First Step
Assume you have already known how to build a react base project.

src/app.jsx

```javascript
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import Router from './router';
import {BrowserRouter} from 'react-router-dom';
import '@/assets/style/index.css';
import '@/assets/scss/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
```

like above , we usually use this file on the entry file. when come to server rendering, we will make a little change here.


`ReactDOM.render`.=> `ReactDOM.hydrate`

> hydrate is design to support server side rendering. for more information you can go office docs.


## Second Step
A little change in routes file to make sure server and local dev routers be the same.
I recommend one package from the official community , `react-router-config`. We use two `renderRoutes` methods.

router/index.jsx
```javascript
import React from 'react';
import {renderRoutes} from 'react-router-config';
import Routes from './Routes';
import Header from '@/components/Header';
import LeftMenu from '@/components/leftMenu';
import Footer from '@/components/Footer';

export default () => {
  return (
    <div>
      <Header />
      <div className="container">
        <LeftMenu />
        {renderRoutes(Routes)}
      </div>
      <Footer />
    </div>
  );
};
```

router/Routes

routes structure like this.
```javascript
export default [
  {
    id: '1',
    parent: '0',
    path: '/',
    name: 'home',
    exact: true,
    component: Home,
    routes: [],
  },
  {
    id: '2',
    parent: '0',
    path: '/counter',
    name: 'counter',
    component: ReduxHome,
  },
  {
    id: '3',
    parent: '0',
    path: '/page2',
    name: 'page2',
    component: () => <h1>page2</h1>,
  },
]
```


## Third step

Build a node server 

first, we use `express`. and the koa server file will be show as below

server/index.js
```javascript
import '@babel/polyfill';
import express from 'express';
import {matchRoutes} from 'react-router-config';
import render from './render';
import store from '../src/redux/store';
import Routes from '../src/router/Routes';

const PORT = process.env.PORT || 8079;
const app = express();

app.use('/assets', express.static('build/assets'));
app.get('*', async (req, res) => {
  const content = 'render some thing here.'

  res.send(content);
});

app.listen(PORT, () =>
  console.log(`Frontend service listening on port: ${PORT}`)
);
```

## Third step

This step is mostly important on server side rendering.we use`renderToString` in  `react-dom/server` package  to render components to string and send it back to browser. And thanks to `react-router` V4, we use StaticRouter to manage our routers in server.

```javascript
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import Router from '../src/router';
import path from 'path';
import fs from 'fs';

const indexFile = path.resolve('./build/index.html');

export default (pathname, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={pathname} context={context}>
        <Router />
      </StaticRouter>
    </Provider>
  );

  return new Promise((resolve, reject) => {
    fs.readFile(indexFile, 'utf8', (err, indexData) => {
      if (err) {
        console.error('Something went wrong:', err);
        reject();
      }
      resolve(
        indexData.replace(
          '<div id="app"></div>',
          `<div id="app">${content}</div><script>
        window.INITIAL_STATE = ${JSON.stringify(
          store.getState()
        )}
      </script>`
        )
      );
    });
  });
};
```

> above is rendering a html which webpack is already build, and we simple replace `#app` node to insert server render string. and give the store server build it.

## Fifth Step

Change render in express file.

```javascript
import '@babel/polyfill';
import express from 'express';
import {matchRoutes} from 'react-router-config';
import render from './render';
import store from '../src/redux/store';
import Routes from '../src/router/Routes';

const PORT = process.env.PORT || 8079;
const app = express();

// server webpack build static
app.use('/assets', express.static('build/assets'));
app.get('*', async (req, res) => {
  ...

// get the render string.
  const content = await render(req.path, store, context);

  res.send(content);
});

app.listen(PORT, () =>
  console.log(`Frontend service listening on port: ${PORT}`)
);
```

## server rendering with Koa.
just change two things.
- static server
- router config

```javascript
app.use(logger());
  app.use(bodyParser());

// static file server
  app.use(
    statics('build', {
      extensions: ['css', 'js'],
    })
  );
  app.use(session({}, app));

  // TODO: Error handling

  // Add routes
  const router = await createRouter();
```



## FInal 
All done. Thanks.