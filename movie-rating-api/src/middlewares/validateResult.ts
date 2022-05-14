import { Request, Response, NextFunction } from 'express'
import { validationResult, ValidationError } from 'express-validator'
import ValidationErrorException from '../errors/ValidationError'
import { ValidationResult } from '../types'

export const validateResult = (req: Request, _res: Response, next: NextFunction): void => {
  const errorFormatter = ({ location, msg, param }: ValidationError): ValidationResult => {
    const obj: ValidationResult = {
      message: msg,
      field: param,
      location
    }
    return obj
  }

  const result = validationResult(req).formatWith(errorFormatter)
  const hasErrors = !result.isEmpty()

  if (hasErrors) {
    throw new ValidationErrorException(result.array({ onlyFirstError: true }))
  }
  return next()
}
