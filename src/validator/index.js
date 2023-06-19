const { AlbumPayloadSchema, SongPayloadSchema } = require('./schema');
const InvariantError = require('../exceptions/InvariantError');

const AlbumValidator = {
  validateAlbumPayload: (payload) => {
    const valdationResult = AlbumPayloadSchema.validate(payload);
    if (valdationResult.error) {
      throw new InvariantError(valdationResult.error.message);
    }
  },
};

const SongValidator = {
  validateSongPayload: (payload) => {
    const valdationResult = SongPayloadSchema.validate(payload);
    if (valdationResult.error) {
      throw new InvariantError(valdationResult.error.message);
    }
  },
};

module.exports = { AlbumValidator, SongValidator };
