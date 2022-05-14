import httpStatusCodes from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'
import { handleResponse } from '../utils/handleResponse'
import ValidationError from '../errors/ValidationError'
import BaseError from '../errors/BaseError'

export const error = (error: Error, req: Request, res: Response, _next: NextFunction): void => {
  let message, status, errors
  if (error instanceof BaseError) {
    message = error.message
    status = error.httpCode
  } else {
    console.error('*    ERROR: ', error.message)
    console.error('*    STACK: ', error.stack)
    console.error('*    REQUEST: ', req.method, req.url)
    console.error('********************************************************')
    message = 'Ocurrió un error desconocido'
    status = httpStatusCodes.INTERNAL_SERVER_ERROR
  }
  if (error instanceof ValidationError) {
    errors = error.errors
  }
  if (error.name === 'AuthenticationError') {
    message = 'Error de autenticación'
    status = httpStatusCodes.UNAUTHORIZED
  }
  handleResponse(res, { status, message, success: false, errors })
}
