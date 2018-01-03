const request = require('request-promise');
const proxy = require('express-http-proxy');
const server = require('express')();
const wordingArray = require('../wording.json');

let spinner;

/**
 * init
 *
 * @since 1.0.0
 *
 * @param initArray array
 *
 * @return Promise
 */

function init(initArray)
{
	return request('https://graph.facebook.com/oauth/access_token?client_id=' + initArray.clientId + '&client_secret=' + initArray.clientSecret + '&grant_type=' + initArray.grantType,
	{
		json: true
	})
	.then(data =>
	{
		return data.access_token;
	})
	.catch(error =>
	{
		spinner.fail(error);
	})
}

/**
 * run
 *
 * @since 1.0.0
 *
 * @param runArray array
 */

function run(runArray)
{
	server.use('/', proxy('graph.facebook.com',
	{
		https: true,
		proxyReqOptDecorator: proxyReqOpts =>
		{
			proxyReqOpts.headers['Authorization'] = 'OAuth ' + runArray.accessToken;
			return proxyReqOpts;
		},
		userResDecorator: (proxyRes, proxyResData, userReq, userRes) =>
		{
			if (userRes.statusCode > 399 && userRes.statusCode < 600)
			{
				spinner.fail(userReq.method + ' ' + userReq.path + ' ' + userRes.statusCode);
			}
			else
			{
				spinner.pass(userReq.method + ' ' + userReq.path + ' ' + userRes.statusCode);
			}
			return proxyResData;
		}
	}));

	/* listen */

	server.listen(runArray.port, () =>
	{
		spinner.start(wordingArray.listen_on + ' ' + wordingArray.colon + runArray.port);
	});
}

/**
 * construct
 *
 * @since 1.0.0
 *
 * @param dependency object
 *
 * @return object
 */

function construct(dependency)
{
	const exports =
	{
		init: init,
		run: run
	};

	/* inject dependency */

	if (dependency.spinner)
	{
		spinner = dependency.spinner;
	}
	return exports;
}

module.exports = construct;
