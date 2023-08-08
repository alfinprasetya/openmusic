class CoverHandler {
  constructor(storageService, albumService, validator) {
    this.storageService = storageService;
    this.albumService = albumService;
    this.validator = validator;
  }

  async postCoverHandler(request, h) {
    const { cover } = request.payload;
    this.validator.validateImageHeaders(cover.hapi.headers);

    const { id } = request.params;

    const filename = await this.storageService.writeFile(cover, cover.hapi);
    const path = `http://${process.env.HOST}:${process.env.PORT}/covers/${filename}`;
    await this.albumService.addAlbumCover(id, path);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = CoverHandler;
