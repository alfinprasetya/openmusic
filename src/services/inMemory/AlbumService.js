// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumService {
  constructor() {
    this.albums = [];
  }

  addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;

    const newAlbum = { id, name, year };

    this.albums.push(newAlbum);

    const isSuccess = this.albums.filter((album) => album.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return id;
  }

  getAlbums() {
    return this.albums;
  }

  getAlbumById(id) {
    const album = this.albums.filter((n) => n.id === id)[0];
    if (!album) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    return album;
  }

  editAlbumById(id, { name, year }) {
    const index = this.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }

    this.albums[index] = {
      ...this.albums[index],
      name,
      year,
    };
  }

  deleteAlbumById(id) {
    const index = this.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }

    this.albums.splice(index, 1);
  }
}

module.exports = AlbumService;
