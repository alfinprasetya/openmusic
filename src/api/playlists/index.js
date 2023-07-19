const PlaylistHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlist',
  version: '1.0.0',
  register: async (server, {
    songService, playlistService, playlistSongService, playlistValidator, playlistSongValidator,
  }) => {
    const playlistHandler = new PlaylistHandler(
      songService,
      playlistService,
      playlistSongService,
      playlistValidator,
      playlistSongValidator,
    );
    server.route(routes(playlistHandler));
  },
};
