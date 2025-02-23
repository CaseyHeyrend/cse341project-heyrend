const utilities = require('./index');

const savePirates = (req, res, next) => {
  const utilitiesRule = {
    fullName: 'required|string',
    birthPlace: 'required|string',
    birthday: 'string',
    status: 'required|string',
    fruitType: 'required|string',
    affiliations: 'required|string',
    position: 'required|string'
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

module.exports = {savePirates};