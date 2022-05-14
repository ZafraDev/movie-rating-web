import { DocumentDefinition, FilterQuery } from 'mongoose'
import User, { IUser } from '../models/User'

export const findUserById = async (id: string): Promise<IUser> => {
  return await User.findById(id).lean()
}

export async function findUser (query: FilterQuery<IUser>): Promise<IUser> {
  return await User.findOne(query).lean()
}

export const findUserByEmail = async (email: IUser['email']): Promise<IUser | null> => {
  return await User.findOne({ email }).select('+password')
}

export async function saveUser (input: DocumentDefinition<IUser>): Promise<IUser> {
  return await User.create(input)
}

export async function validatePassword (user: IUser, password: string): Promise<boolean> {
  const isValid = await user.comparePassword(password)

  return isValid
}
