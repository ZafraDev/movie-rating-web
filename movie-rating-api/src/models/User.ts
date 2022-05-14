import { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import moment from 'moment-timezone'

export interface IUser extends Document {
  name: string
  lastname: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
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

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.createdAt = moment().tz('America/Lima').toDate()
  this.updatedAt = moment().tz('America/Lima').toDate()

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(this.password, salt)
  this.password = hash

  next()
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

export default model<IUser>('User', userSchema)
