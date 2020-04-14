const fetch = require('node-fetch');
const proxy = require('express-http-proxy');
const server = require('express')();
const wordingObject = require('../wording.json');

let spinner;

/**
 * init
 *
 * @since 1.0.0
 *
 * @param {object} initObject
 *
 * @return {Promise}
 */

function init(initObject)
{
	let params = new URLSearchParams();

	params.set('client_id', initObject.clientId);
	params.set('client_secret', initObject.clientSecret);
	params.set('grant_type', initObject.grantType);
	return fetch('https://graph.facebook.com/oauth/access_token?' + params)
		.then(response => response.json())
		.then(data => data.access_token)
		.catch(error => spinner.fail(error));
}

/**
 * run
 *
 * @since 1.0.0
 *
 * @param {object} runObject
 *
 * @return {void}
 */

function run(runObject)
{
	server.use('/', proxy('graph.facebook.com',
	{
		https: true,
		proxyReqOptDecorator: proxyReqOpts =>
		{
			proxyReqOpts.headers['Authorization'] = 'Bearer ' + runObject.accessToken;
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
				spinner.succeed(userReq.method + ' ' + userReq.path + ' ' + userRes.statusCode);
			}
			return proxyResData;
		}
	}));

	/* listen */

	server.listen(runObject.port, () =>
	{
		spinner.start(wordingObject.listen_on + ' ' + wordingObject.colon + runObject.port);
	});
}

/**
 * construct
 *
 * @since 1.0.0
 *
 * @param {object} injectorObject
 *
 * @return {object}
 */

function construct(injectorObject)
{
	const exports =
	{
		init,
		run
	};

	/* handle injector */

	if (injectorObject.spinner)
	{
		spinner = injectorObject.spinner;
	}
	return exports;
}

module.exports = construct;
