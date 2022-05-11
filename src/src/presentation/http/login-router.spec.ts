class LoginRouter {
  route (params: any) {
    const { body } = params
    if (!body.email) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = new LoginRouter()
    const request = {
      body: {
        password: 'any_password'
      }
    }
    const response = sut.route(request)
    expect(response.statusCode).toBe(400)
  })
})