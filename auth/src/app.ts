import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError } from '@apa_malaghe/utility'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

import morganMiddleware from './middleware/morganMiddleware'
import Logger from './middleware/logger'
import { findByIDRouter } from './routes/findbyid'

var rfs = require('rotating-file-stream') // version 2.x
var morgan = require('morgan')
var path = require('path')

const app = express()
app.set('trust proxy', true)

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

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV != 'test',
  })
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(findByIDRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
