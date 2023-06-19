// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const songs = require('./api/songs');
const AlbumService = require('./services/postgres/AlbumService');
const SongService = require('./services/postgres/SongService');
const { AlbumValidator, SongValidator } = require('./validator');

const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumService,
        validator: AlbumValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songService,
        validator: SongValidator,
      },
    },
  ]);

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
