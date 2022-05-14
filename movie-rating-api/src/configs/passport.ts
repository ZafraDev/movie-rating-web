import httpStatusCodes from 'http-status-codes'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import config from '../configs/default'
import { Types } from 'mongoose'
import { findUserById } from '../services/user'
import APIError from '../errors/APIError'
import passport from 'passport'

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET
}

const JWTStrategy = new Strategy(opts, (payload, done) => {
  const id = payload.id
  if (Types.ObjectId.isValid(id)) {
    findUserById(id).then((user) => {
      if (user != null) {
        return user
      }
      return done(null, false)
    }).catch((err) => {
      return done(err, false)
    })
  } else {
    throw new APIError('AuthenticationError', httpStatusCodes.UNAUTHORIZED, 'El token no es válido')
  }
})

passport.use(JWTStrategy)
