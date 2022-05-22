import { MissingParamError } from '../helpers/missing-params-error'
import { LoginRouter } from './login-router'

const makeSut = () => {
  class AuthUseCaseSpy {
    public email: string
    public password: string

    auth (email: string, password: string): void {
      this.email = email
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut,
    authUseCaseSpy
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const response = sut.route()
    expect(response.statusCode).toBe(500)
  })
  test('Should return 500 if httpRequest is no body provided', () => {
    const { sut } = makeSut()
    const response = sut.route({})
    expect(response.statusCode).toBe(500)
  })
  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut()
    const request = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    sut.route(request)
    expect(authUseCaseSpy.email).toBe(request.body.email)
    expect(authUseCaseSpy.password).toBe(request.body.password)
  })
  test('Should return 401 when invalid credentials are provided', () => {
    const { sut } = makeSut()
    const request = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }
    const response = sut.route(request)
    expect(response.statusCode).toBe(401)
  })
  test('Should return 500 if no AuthUseCase is provided', () => {
    const sut = new LoginRouter()
    const request = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const response = sut.route(request)
    expect(response.statusCode).toBe(500)
  })
  test('Should return 500 if AuthUseCase has no auth method', () => {
    const sut = new LoginRouter({})
    const request = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const response = sut.route(request)
    expect(response.statusCode).toBe(500)
  })
})
