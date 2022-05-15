import { MissingParamError } from './missing-params-error'

export class HttpReponse {
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
