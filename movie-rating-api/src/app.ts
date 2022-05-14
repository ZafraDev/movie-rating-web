import 'dotenv/config'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import './configs/database'
import './configs/passport'

import { notFound } from './middlewares/notFound'
import { error } from './middlewares/error'

import routes from './routes'
import passport from 'passport'

const app = express()

// Enable development or production HTTP request logger middleware
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))

app.use('/public', express.static('./public'))

// For parsing json
app.use(express.json())

// Init all other stuff
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(passport.initialize())

// Import all routes
app.use('/api', routes)

// Not found handler
app.use('*', notFound)

// Middleware error
app.use(error)

// Export express server
export default app
