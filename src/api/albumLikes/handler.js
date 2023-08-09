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
    const likesCount = await this.albumLikesService.countAlbumLikes(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes: Number(likesCount),
      },
    });
    return response;
  }
}

module.exports = AlbumLikesHandler;
