import mongoose from 'mongoose'

import config from './default'

mongoose.connect(config.DB.URI).then(() => {
  console.log('*    DB Connection: OK\n****************************')
}).catch((err: Error) => {
  console.log('*    DB Connection: FAILED\n****************************')
  console.error(err)
  process.exit(1)
})
