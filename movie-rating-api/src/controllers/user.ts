import { Request, Response } from 'express'
import { matchedData } from 'express-validator'
import httpStatusCodes from 'http-status-codes'
import APIError from '../errors/APIError'
import { IUser } from '../models/User'
import { findUserByEmail, saveUser } from '../services/user'
import { handleController } from '../utils/handleController'
import { handleResponse } from '../utils/handleResponse'

export const createUser = handleController(async (req: Request, res: Response): Promise<void> => {
  const user = matchedData(req)

  const foundUser = await findUserByEmail(user.email)
  if (foundUser != null) {
    throw new APIError('UserExist', httpStatusCodes.CONFLICT, 'El correo electrónico ya está registrado')
  }

  const savedUser = saveUser(user as IUser)

  handleResponse(res, { data: savedUser, success: true, status: httpStatusCodes.CREATED })
})
