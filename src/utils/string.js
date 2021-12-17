/**
 * Capitalize first letter of input string
 * @param {string} str
 * @returns {string} A string with first letter capitalized
 */
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  capitalizeFirstLetter,
};
