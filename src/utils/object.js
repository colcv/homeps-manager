/**
 * Filter input object with allowed fields
 * @param {Object} obj - Object to be filtered
 * @param {Array} allowedFields
 * @returns {Object} Filtered object
 */
const filterObject = (obj, ...allowedFields) => {
  const filteredObject = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      filteredObject[el] = obj[el];
    }
  });
  return filteredObject;
};

module.exports = {
  filterObject,
};
