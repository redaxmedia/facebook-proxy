Facebook Proxy
==============

> A proxy server to unleash the Facebook Graph API without the need of user authentication.

[![Build Status](https://img.shields.io/travis/redaxmedia/facebook-proxy.svg)](https://travis-ci.org/redaxmedia/facebook-proxy)
[![NPM Version](https://img.shields.io/npm/v/facebook-proxy.svg)](https://npmjs.com/package/facebook-proxy)
[![License](https://img.shields.io/npm/l/facebook-proxy.svg)](https://npmjs.com/package/facebook-proxy)
[![Deploy Heroku](https://img.shields.io/badge/deploy-heroku-7056bf.svg)](https://heroku.com/deploy?template=https://github.com/redaxmedia/facebook-proxy)


Preview
-------

![Terminal Session](https://cdn.rawgit.com/redaxmedia/media/master/facebook-proxy/terminal-session.svg)


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
FACEBOOK_GRANT_TYPE=
PORT=
```


Usage
-----

```
bin/facebook-proxy
```


Deployment
----------

Trigger [Deploy to Heroku](https://heroku.com/deploy?template=https://github.com/redaxmedia/facebook-proxy) and fill out the form.
