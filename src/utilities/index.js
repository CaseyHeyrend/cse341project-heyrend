// Middleware for validation
const Utilities = require('validatorjs');
const utilities = (body, rules, customMessages, callback) => {
  const validation = new Utilities(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};
module.exports = utilities;