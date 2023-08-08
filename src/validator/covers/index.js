const InvariantError = require('../../exceptions/InvariantError');
const CoverHeadersSchema = require('./schema');

const CoverValidator = {
  validateImageHeaders: (headers) => {
    const validationResult = CoverHeadersSchema.validate(headers);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CoverValidator;
