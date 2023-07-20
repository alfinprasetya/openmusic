const PlaylistHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlist',
  version: '1.0.0',
  register: async (server, {
    playlistService,
    playlistSongService,
    playlistActivitiesService,
    playlistValidator,
    playlistSongValidator,
  }) => {
    const playlistHandler = new PlaylistHandler(
      playlistService,
      playlistSongService,
      playlistActivitiesService,
      playlistValidator,
      playlistSongValidator,
    );
    server.route(routes(playlistHandler));
  },
};
