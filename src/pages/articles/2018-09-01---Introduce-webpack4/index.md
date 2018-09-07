---
title: Welcome to Webpack 4
date: "2018-09-08T22:40:32.169Z"
layout: post
draft: false
path: "/posts/welcome-to-webpack4/"
category: "Javascript"
tags:
  - "webpack"
  - "Javascript"
  - "Web Development"
description: "An Essay on how to config webpack4, just for the beginner."
---


- install webpack

```bash
yarn global add webpack webpack-cli

# or 
yarn add webpack webpack-cli -D

# install in node_modules
```
if you use npm ,just type `npm i -g webpack webpack-cli` to install global, or `npm i webpack webpack-cli --save-dev` to install in locally.


- Folder Structure

my folder is like this.

```bash

├── package.json
├── server.js
├── src
│   ├── index.js
│   ├── math.js
│   ├── print.js
│   └── styles.css
├── webpack.common.js
├── webpack.dev.js
├── webpack.json
├── webpack.prod.js
├── yarn-error.log
└── yarn.lock

1 directory, 12 files

```


- Without config file

we can use some base command to build packages.

```bash
webpack <Entry> -o <output>

# such as build index.js => bundle.js
webpack src/index.js -o dist/bundle.js 
```

This is basic command line use webpack, Also you can enjoy yourself if you want to use webpack like this.

- Basic config

A sample config file will be like this,no plugins, no modules, just bundle to dist.

webpack.config.js

```javascript
var path = require("path");

module.exports = {
  mode: "development", // environment
  entry: "./src/index.js",// entry point
  output: { // bundle config
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  }
};
```

this config is worked. However we need run `webpack --config webpack.config.js` every time to build files.
So we need webpack to auto reload new files , so we can run `webpack --config webpack.config.js -w` to watch files changes and auto rebuild to dist files.
But mostly we want to serve this files ,so we can see changes from chrome immediately.Ok, you can see the next title is about `webpack-dev-server`

- HMR with webpack-dev-server

three points to change webpack.config.js

```javascript
var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.js"
    //print: "./src/print.js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true // HMR enabled
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Hot module replacement"
    }),
// HMR requied plugins
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

As this far, I also want to say this config is enough, But HMR need to be support by loader or you can write yourself.I will show you how it works as below.

```javascript
import _ from "lodash";
import printMe from "./print";
import "./styles.css";

function component() {
  var element = document.createElement("div");
  var btn = document.createElement("button");
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  btn.innerHTML = "Click me and check the console1!";
  btn.onclick = printMe;

  element.appendChild(btn);
  return element;
}

let element = component();
document.body.appendChild(element);

// Begin HMR support .
if (module.hot) {
  module.hot.accept("./print.js", function() {
    console.log("Accepting the updated printMe module!");
    // move old element
    document.body.removeChild(element);
    element = component();
    // bind a new element.
    document.body.appendChild(element);
  });
}
```

So here is the HMR steps.
- remove old bind elements
- create new elements
- bind new elements.

As you see , I import style.css, because `style-loader`
support HMR, you can change `body` color 

```css
body{
  background: red;
}

```
and `webpack-dev-server` will reload , and body will be red after `webpack-dev-server` refresh window.And so be it, see you next time.