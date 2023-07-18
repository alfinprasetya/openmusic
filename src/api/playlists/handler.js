class PlaylistHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
  }

  async postPlaylistHandler(request, h) {
    this.validator.validatePlaylistPayload(request.payload);

    const { name } = request.payload;

    const { id: owner } = request.auth.credentials;

    const playlistId = await this.service.addPlaylist({ name, owner });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request) {
    const { id: owner } = request.auth.credentials;
    const result = await this.service.getPlaylists(owner);
    const playlists = result.map(({ owner: username, ...a }) => ({ ...a, username }));

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistHandler(request) {
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;
    await this.service.verifyPlaylistOwner(id, owner);
    await this.service.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }
}

module.exports = PlaylistHandler;
