import { Request, Response } from 'express'
import httpStatusCodes from 'http-status-codes'

export const notFound = (req: Request, res: Response): void => {
  res.status(httpStatusCodes.NOT_FOUND).json({ message: `No se encontrĂ³ la URL ${req.originalUrl}` })
}
