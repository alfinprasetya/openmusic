const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class AlbumLikesService {
  constructor() {
    this.pool = new Pool();
  }

  async addAlbumLikes(userId, albumId) {
    await this.verifyAlbumLikes(userId, albumId);

    const id = `likes-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const result = await this.pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Likes gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async deleteAlbumLikes(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Likes gagal dihapus');
    }
  }

  async countAlbumLikes(albumId) {
    const query = {
      text: 'SELECT COUNT(id) FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this.pool.query(query);

    if (!result.rows[0].count) {
      throw new InvariantError('Gagal menghitung likes');
    }

    return result.rows[0].count;
  }

  async verifyAlbumLikes(userId, albumId) {
    const query = {
      text: 'SELECT id FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const result = await this.pool.query(query);

    if (result.rows[0]) {
      throw new InvariantError('Sudah menyukai album');
    }
  }
}

module.exports = AlbumLikesService;
