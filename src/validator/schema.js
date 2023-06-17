// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

module.exports = { AlbumPayloadSchema };
