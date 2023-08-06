class UsersHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
  }

  async postUserHandler(request, h) {
    this.validator.validateUserPayload(request.payload);
    const user = request.payload;

    const userId = await this.service.addUser(user);

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
