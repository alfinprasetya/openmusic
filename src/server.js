const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const AlbumService = require('./services/inMemory/AlbumService');
const { AlbumValidator } = require('./validator');

const init = async () => {
  const albumService = new AlbumService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: albums,
    options: {
      service: albumService,
      validator: AlbumValidator,
    },
  });

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
