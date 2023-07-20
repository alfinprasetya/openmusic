const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class PlaylistActivitiesService {
  constructor() {
    this.pool = new Pool();
  }

  async addPlaylistActivities({
    playlistId, songId, userId, action,
  }) {
    const id = `activities-${nanoid(16)}`;

    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, action, time],
    };

    const result = await this.pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Activities gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylistActivities(playlistId) {
    const query = {
      text: `SELECT users.username, songs.title, action, time FROM playlist_song_activities
      LEFT JOIN users ON users.id = playlist_song_activities.user_id
      LEFT JOIN songs ON songs.id = playlist_song_activities.song_id 
      WHERE playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this.pool.query(query);

    return {
      activities: result.rows,
    };
  }
}

module.exports = PlaylistActivitiesService;
