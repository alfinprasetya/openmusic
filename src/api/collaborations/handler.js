class CollaborationHandler {
  constructor(collaborationService, playlistService, userService, validator) {
    this.collaborationService = collaborationService;
    this.playlistService = playlistService;
    this.userService = userService;
    this.validator = validator;
  }

  async postCollaborationHandler(request, h) {
    this.validator.validateCollaborationPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { playlistId, userId } = request.payload;

    await this.userService.getUserById(userId);
    await this.playlistService.verifyPlaylistOwner(playlistId, credentialId);
    const collaborationId = await this.collaborationService.addCollaboration(playlistId, userId);

    const response = h.response({
      status: 'success',
      message: 'Kolaborasi berhasil ditambahkan',
      data: {
        collaborationId,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCollaborationHandler(request) {
    this.validator.validateCollaborationPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { playlistId, userId } = request.payload;

    await this.playlistService.verifyPlaylistOwner(playlistId, credentialId);
    await this.collaborationService.deleteCollaboration(playlistId, userId);

    return {
      status: 'success',
      message: 'Kolaborasi berhasil dihapus',
    };
  }
}

module.exports = CollaborationHandler;
