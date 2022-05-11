class LoginRouter {
  route (httpRequest?: any) {
    if (!httpRequest || !httpRequest.body) {
      return HttpReponse.serverError('httpRequest')
    }
    const { email, password } = httpRequest.body
    if (!email) { return HttpReponse.badRequest('email') }

    if (!password) { return HttpReponse.badRequest('password') }
  }
}

class HttpReponse {
  static serverError (paramName: string) {
    return {
      statusCode: 500,
      body: new MissingParamError(paramName)
    }
  }

  static badRequest (paramName: string) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }
}

class MissingParamError extends Error {
  constructor (public paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
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
    expect(response.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const sut = new LoginRouter()
    const request = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const response = sut.route(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })
  test('Should return 500 if no httpRequest is no provided', () => {
    const sut = new LoginRouter()
    const response = sut.route()
    expect(response.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest is no body provided', () => {
    const sut = new LoginRouter()
    const response = sut.route({})
    expect(response.statusCode).toBe(500)
  })
})
