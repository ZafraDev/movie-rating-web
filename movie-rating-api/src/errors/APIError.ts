import httpStatusCodes from 'http-status-codes'
import BaseError from './BaseError'

class APIError extends BaseError {
  constructor (name: string, httpCode = httpStatusCodes.INTERNAL_SERVER_ERROR, message = 'Ocurrió un error inesperado') {
    super(name, httpCode, message)
  }
}

export default APIError
