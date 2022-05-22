import { HttpReponse, HttpResponseInterface } from '../helpers/http-response'

export class LoginRouter {
  private authUseCase: any
  constructor (
    authUseCase?:any
  ) {
    this.authUseCase = authUseCase
  }

  route (httpRequest?: any): HttpResponseInterface {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
      return HttpReponse.serverError('httpRequest')
    }
    const { email, password } = httpRequest.body
    if (!email) { return HttpReponse.badRequest('email') }

    if (!password) { return HttpReponse.badRequest('password') }

    this.authUseCase.auth(email, password)

    return HttpReponse.unauthorizedError()
  }
}
