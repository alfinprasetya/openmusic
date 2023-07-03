const SongPayloadSchema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const SongValidator = {
  validateSongPayload: (payload) => {
    const valdationResult = SongPayloadSchema.validate(payload);
    if (valdationResult.error) {
      throw new InvariantError(valdationResult.error.message);
    }
  },
};

module.exports = SongValidator;
