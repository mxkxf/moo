module.exports = {
	/**
	 * Parse arguments.
	 * 
	 * @param  {string} text
	 * @param  {string} argumentName
	 * @return {string|null}
	 */
	parseArguments: function (text, argumentName) {
		var arguments = text.match(/[^[\]]+(?=])/g);

		if (!arguments) {
			return;
		}

		arguments.map(function (arg) {
			if (arg.split(' ')[0] === argumentName) {
				return arg.substring(argumentName.length).trim();
			}
		});
	}
}
