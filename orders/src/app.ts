import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError, currentUser } from '@apa_malaghe/utility'

import { indexOrderRouter } from './routes/index'
import { newOrderRouter } from './routes/new'

import morganMiddleware from './middleware/morganMiddleware'
import Logger from './middleware/logger'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import { findByIDRouter } from './routes/findbyid'

var rfs = require('rotating-file-stream') // version 2.x
var morgan = require('morgan')
var path = require('path')

const app = express()
app.set('trust proxy', true)

// Set security HTTP headers
app.use(helmet())

// Limit requests from same API
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)

app.use(json())

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log'),
})

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(morganMiddleware)
app.get('/logger', (_, res) => {
  Logger.error('This is an error log')
  Logger.warn('This is a warn log')
  Logger.info('This is a info log')
  Logger.http('This is a http log')
  Logger.debug('This is a debug log')

  res.send('Hello world')
})

// Data sanitization against NoSQL query injection
app.use(ExpressMongoSanitize())

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV != 'test',
  })
)
app.use(currentUser)

app.use(newOrderRouter)
app.use(indexOrderRouter)
app.use(findByIDRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
