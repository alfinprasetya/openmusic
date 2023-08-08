const CoverHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'covers',
  version: '1.0.0',
  register: async (server, { storageService, albumService, validator }) => {
    const coverHandler = new CoverHandler(storageService, albumService, validator);
    server.route(routes(coverHandler));
  },
};
