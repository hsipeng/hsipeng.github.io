---
title: how to set up python develop environment
date: "2018-10-20T22:40:32.169Z"
layout: post
draft: false
path: "/posts/set-up-python-dev-environment/"
category: "python"
tags:
  - "python"
  - "environment"
description: "An Essay on how to set up python develop environment."
---


# virtualenv python
## install
```bash
pip3 install virtualenv
```

## project
```bash
mkdir myproject
cd myproject/

# init environment
virtualenv --no-site-packages venv
```

> new python environment will put in `venv` directory .

## usage
* active venv
```bash
source venv/bin/activate
```

then you can use `python` or `pip` command on the project .

* deactivate

```bash
deactivate
```

## requirements.txt

```bash
pip freeze > requirements.txt
python --version > runtime.txt
```

read from txt file.

```bash
pip install -r requirements.txt
```