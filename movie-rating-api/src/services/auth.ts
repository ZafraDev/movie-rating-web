import jwt from 'jsonwebtoken'
import moment from 'moment-timezone'
import config from '../configs/default'
import { Token } from '../types'

export const generateToken = (userId: string): Token => {
  const date = moment().tz('America/Lima').add(config.JWT_EXPIRATION_IN_MINUTES, 'minutes').valueOf()

  const expiration = Math.floor(date / 1000)

  const millisExpiredTime = expiration * 1000

  const expiredDate = moment(millisExpiredTime).tz('America/Lima').format()

  // returns signed token
  const tokenObj: Token = {
    access_token: jwt.sign({ userId, expiration }, config.JWT_SECRET),
    expired_in: millisExpiredTime,
    expired_date: expiredDate
  }
  return tokenObj
}
