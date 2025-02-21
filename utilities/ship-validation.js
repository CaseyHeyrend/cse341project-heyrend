const utilities = require('./index');

const saveShips = (req, res, next) => {
  const utilitiesRule = {
    user: 'required|string',
    password: 'required|string'
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

module.exports = {saveShips};