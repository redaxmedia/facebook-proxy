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
 */

function init(initArray)
{
	request('https://graph.facebook.com/oauth/access_token?client_id=' + initArray.client_id + '&client_secret=' + initArray.client_secret + '&grant_type=' + initArray.grant_type,
	{
		json: true
	})
	.then(data =>
	{
		process.env.ACCESS_TOKEN = data.access_token;
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
			proxyReqOpts.headers['Authorization'] = 'OAuth ' + process.env.ACCESS_TOKEN;
			return proxyReqOpts;
		},
		userResDecorator: function(proxyRes, proxyResData, userReq, userRes)
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
