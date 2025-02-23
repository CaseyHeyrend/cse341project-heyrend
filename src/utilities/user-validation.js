// Desc: User validation rules
const utilities = require('./index');

const userRules = (req, res, next) => {
  const utilitiesRule = {
    username: 'required|string',
    password: 'required|string',
    email: 'required|email',
    name: 'required|string',
    owner: 'required|string'
  };
  utilities(req.body, utilitiesRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {userRules};