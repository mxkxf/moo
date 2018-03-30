module.exports = {
  /**
   * Parse arguments.
   *
   * @param  {string} text
   * @param  {string} argumentName
   * @return {string|null}
   */
  getArgument: function(text, argumentName) {
    let arguments = text.match(/[^[\]]+(?=])/g);
    let value = arguments && arguments.find(arg => arg.split(' ')[0] === argumentName);
    return value && value.split(' ')[1];
  },
};
