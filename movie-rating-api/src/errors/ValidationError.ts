import BaseError from './BaseError'

class ValidationError extends BaseError {
  public readonly errors: any[]

  constructor (errors: any[]) {
    super('ValidationError', 400, 'Error en la validación de datos')
    this.errors = errors
  }
}

export default ValidationError
