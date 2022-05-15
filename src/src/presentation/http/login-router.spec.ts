import { MissingParamError } from '../helpers/missing-params-error'
import { LoginRouter } from './login-router'

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
