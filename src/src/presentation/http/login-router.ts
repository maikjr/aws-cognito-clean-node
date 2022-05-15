import { HttpReponse } from '../helpers/http-response'

export class LoginRouter {
  route (httpRequest?: any) {
    if (!httpRequest || !httpRequest.body) {
      return HttpReponse.serverError('httpRequest')
    }
    const { email, password } = httpRequest.body
    if (!email) { return HttpReponse.badRequest('email') }

    if (!password) { return HttpReponse.badRequest('password') }
  }
}
