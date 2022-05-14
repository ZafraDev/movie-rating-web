import { Location } from 'express-validator'

export interface Token {
  access_token: string
  expired_in: number
  expired_date: string
}

export interface ValidationResult {
  message: any
  field: string
  location?: Location
}
