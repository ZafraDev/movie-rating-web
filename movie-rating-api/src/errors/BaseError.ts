import { StatusCodes } from 'http-status-codes'

class BaseError extends Error {
  public readonly name: string
  public readonly httpCode: StatusCodes
  public readonly message: string

  constructor (name: string, httpCode: StatusCodes, message: string) {
    super(message)
    this.name = name
    this.httpCode = httpCode
  }
}

export default BaseError
