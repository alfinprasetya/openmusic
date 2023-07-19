class PlaylistHandler {
  constructor(
    songService,
    playlistService,
    playlistSongService,
    playlistValidator,
    playlistSongValidator,
  ) {
    this.songService = songService;
    this.playlistService = playlistService;
    this.playlistSongService = playlistSongService;
    this.playlistValidator = playlistValidator;
    this.playlistSongValidator = playlistSongValidator;
  }

  async postPlaylistHandler(request, h) {
    this.playlistValidator.validatePlaylistPayload(request.payload);

    const { name } = request.payload;

    const { id: owner } = request.auth.credentials;

    const playlistId = await this.playlistService.addPlaylist({ name, owner });

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
    const playlists = await this.playlistService.getPlaylists(owner);

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
    await this.playlistService.verifyPlaylistOwner(id, owner);
    await this.playlistService.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  async postPlaylistSongHandler(request, h) {
    this.playlistSongValidator.validatePlaylistSongPayload(request.payload);

    const { songId } = request.payload;
    const { id: playlistId } = request.params;
    const { id: owner } = request.auth.credentials;

    await this.songService.getSongById(songId);
    await this.playlistService.verifyPlaylistOwner(playlistId, owner);
    await this.playlistSongService.addPlaylistSong(playlistId, songId);

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request) {
    const { id: owner } = request.auth.credentials;
    const { id } = request.params;

    await this.playlistService.verifyPlaylistOwner(id, owner);

    const playlist = await this.playlistService.getPlaylistById(id);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongHandler(request) {
    const { id: owner } = request.auth.credentials;
    const { id: playlistId } = request.params;
    const { songId } = request.payload;

    await this.playlistService.verifyPlaylistOwner(playlistId, owner);
    await this.playlistSongService.deletePlaylistSong(playlistId, songId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistHandler;
