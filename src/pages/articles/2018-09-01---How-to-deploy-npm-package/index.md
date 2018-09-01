---
title: How To Deploy A Npm Package
date: "2018-09-01T22:40:32.169Z"
layout: post
draft: false
path: "/posts/How-to-deploy-npm-package/"
category: "Javascript"
tags:
  - "Npm"
  - "Javascript"
  - "Web Development"
description: "An Essay on how to deploy a npm package to npmjs.org, just for the beginner."
---

##  environment
- node
- npm
- nrm

### change registry

```bash
nrm use npm
```

### npm add a user

npm add-user

name:
password
email:


> then you will receive a email to verify your email, Please check your junk mail list .


### GitHub account

you must have a git repo to contain npm package source code.

### local files

```plaintext
├── README.md
├── index.js
├── lib
│   └── index.js
├── package.json
└── test
```

this is a simple npm package template

### package.json

some configure must be set 


```json
{
  "name": "your-package-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "repository": "your-https-git-repo",
  "keywords": [
    "hello",
    "test"
  ],
  "files": [
    "lib",
    "README.md"
  ],
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "your name  <your email>",
  "license": "MIT"
}

```

> name and version is required.
> and author must be the same you login.

### login && publish

npm login

username:
password:


npm publish
> you must git commit local branch before run npm publish

> usually success ,and you will find your package, on [npmjs.com](https://npmjs.com)

### publish versions

`$ npm version <patch|minor|major>`, if you have already published to npm

	- patch for bug fix
	- minor for new feature
	- major for breaking changes

`npm pack` or `npm link` to validate the module to be publish

`$ npm publish`

