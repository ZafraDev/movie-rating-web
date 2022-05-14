import { model, Schema, Document, PopulatedDoc } from 'mongoose'
import bcrypt from 'bcrypt'
import moment from 'moment-timezone'
import { IUser } from './User'

export interface ICast extends Document{
  name: string
  profilePicture: string
  infoUrl: string
}

export interface IRating extends Document {
  user: PopulatedDoc<IUser>
  rating: number
}

export interface IMovie extends Document {
  title: string
  plot: string
  trailer: string
  poster: string
  cover: string
  rating: IRating[]
  cast: ICast[]
}

const movieSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})

movieSchema.pre<IUser>('save', async function (next) {
  this.createdAt = moment().tz('America/Lima').toDate()
  this.updatedAt = moment().tz('America/Lima').toDate()

  next()
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

export default model<IUser>('User', movieSchema)
