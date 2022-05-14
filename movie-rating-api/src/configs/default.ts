const config = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: process.env.PORT ?? 3000,
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
  JWT_EXPIRATION_IN_MINUTES: process.env.JWT_EXPIRATION_IN_MINUTES ?? 60,
  DB: {
    URI: process.env.MONGODB_URI ?? 'mongodb://localhost/movie-rating-api'
  }
}

export default config
