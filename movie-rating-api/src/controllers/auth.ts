import httpStatusCodes from 'http-status-codes'
import { Request, Response } from 'express'
import { matchedData } from 'express-validator'
import { handleResponse } from '../utils/handleResponse'
import { findUserByEmail, validatePassword } from '../services/user'
import APIError from '../errors/APIError'
import { generateToken } from '../services/auth'
import { handleController } from '../utils/handleController'

export const signIn = handleController(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = matchedData(req)
  const user = await findUserByEmail(email)

  if (user == null) {
    throw new APIError('UserNotFound', httpStatusCodes.NOT_FOUND, 'El usuario no existe')
  }

  const isPasswordValid = await validatePassword(user, password)
  if (!isPasswordValid) {
    throw new APIError('InvalidPassword', httpStatusCodes.UNAUTHORIZED, 'El correo electrónico o la contraseña son incorrectos')
  }

  const tokenObj = generateToken(user._id)

  handleResponse(res, { data: { ...tokenObj, user }, success: true, status: httpStatusCodes.OK })
})
