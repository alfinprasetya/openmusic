class AlbumLikesHandler {
  constructor(albumLikesService, albumService) {
    this.albumLikesService = albumLikesService;
    this.albumService = albumService;
  }

  async postAlbumLikeHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this.albumService.getAlbumById(albumId);
    await this.albumLikesService.addAlbumLikes(userId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menyukai album',
    });
    response.code(201);
    return response;
  }

  async deleteAlbumLikeHandler(request) {
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this.albumService.getAlbumById(albumId);
    await this.albumLikesService.deleteAlbumLikes(userId, albumId);

    return {
      status: 'success',
      message: 'Batal menyukai album',
    };
  }

  async getAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;

    await this.albumService.getAlbumById(albumId);
    const { likes, cached } = await this.albumLikesService.getAlbumLikes(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes: Number(likes),
      },
    });
    if (cached) response.header('X-Data-Source', 'cache');
    return response;
  }
}

module.exports = AlbumLikesHandler;
