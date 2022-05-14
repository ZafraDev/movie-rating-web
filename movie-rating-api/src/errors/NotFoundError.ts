import httpStatusCodes from 'http-status-codes'
import BaseError from './BaseError'

class NotFoundError extends BaseError {
  constructor (name: string, path: string) {
    super(name, httpStatusCodes.NOT_FOUND, `No se encontró el recurso ${path}`)
  }
}

export default NotFoundError
