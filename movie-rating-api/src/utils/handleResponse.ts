import { Response } from 'express'
import httpStatusCodes, { StatusCodes } from 'http-status-codes'

export const handleResponse = (
  res: Response,
  {
    data,
    errors,
    success = true,
    status = httpStatusCodes.OK,
    message = 'La solicitud se realizó de manera correcta'
  }: {
    data?: any
    errors?: any[]
    success?: boolean
    status?: StatusCodes
    message?: string
  }): void => {
  res.status(status).json({ data, message, status, success, errors })
}
