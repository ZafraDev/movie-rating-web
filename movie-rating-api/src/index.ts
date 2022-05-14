import app from './app'
import config from './configs/default'

app.listen(config.PORT, () => {
  // Prints initialization
  if (config.NODE_ENV !== 'test') {
    console.log('****************************')
    console.log('*    Starting Server')
    console.log(`*    Port: ${config.PORT}`)
    console.log(`*    NODE_ENV: ${config.NODE_ENV}`)
    console.log('*    Database: MongoDB')
    console.log('****************************')
  }
})
