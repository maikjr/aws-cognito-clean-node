import { MissingParamError } from './missing-params-error'
import { UnauthorizedError } from './unauthorized-error'

export interface HttpResponseInterface {
  statusCode: number;
  body: Error;
}

export class HttpReponse {
  static serverError (paramName: string): HttpResponseInterface {
    return {
      statusCode: 500,
      body: new MissingParamError(paramName)
    }
  }

  static badRequest (paramName: string): HttpResponseInterface {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static unauthorizedError (): HttpResponseInterface {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }
}
