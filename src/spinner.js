const ora = require('ora');
const wordingArray = require('../wording.json');

let spinner;

/**
 * start
 *
 * @since 1.0.0
 *
 * @param text string
 */

function start(text)
{
	spinner.start(text);
}

/**
 * pass
 *
 * @since 1.0.0
 *
 * @param text string
 */

function pass(text)
{
	spinner.succeed(text);
}

/**
 * fail
 *
 * @since 1.0.0
 *
 * @param text string
 */

function fail(text)
{
	spinner.fail(text);
}

/**
 * init
 *
 * @since 1.0.0
 *
 * @param initArray array
 */

function init(initArray)
{
	spinner = ora(initArray);
	start(wordingArray.please_wait + wordingArray.point.repeat(3));
}

module.exports =
{
	init: init,
	start: start,
	pass: pass,
	fail: fail
};
