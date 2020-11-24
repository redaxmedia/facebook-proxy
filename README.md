Facebook Proxy
==============

> A dead simple HTTP proxy to unleash the Facebook API.

[![Build Status](https://img.shields.io/github/workflow/status/redaxmedia/facebook-proxy/ci.svg)](https://github.com/redaxmedia/facebook-proxy/actions?query=workflow:ci)
[![NPM Version](https://img.shields.io/npm/v/facebook-proxy.svg)](https://npmjs.com/package/facebook-proxy)
[![License](https://img.shields.io/npm/l/facebook-proxy.svg)](https://npmjs.com/package/facebook-proxy)
[![Deploy Heroku](https://img.shields.io/badge/deploy-heroku-7056bf.svg)](https://heroku.com/deploy?template=https://github.com/redaxmedia/facebook-proxy)


Installation
------------

```
npm install facebook-proxy
```


Setup
-----

Create a `.env` file to define your environment variables:

```
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
FACEBOOK_GRANT_TYPE=client_credentials
PORT=3000
```


Usage
-----

Serve local HTTP proxy:

```
facebook-proxy
```

Browse your working copy:

```
http://localhost:3000
```


Deployment
----------

Trigger [Deploy to Heroku](https://heroku.com/deploy?template=https://github.com/redaxmedia/facebook-proxy) and fill out the form.
