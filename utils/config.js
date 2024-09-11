require('dotenv').config()

const PORT = process.env.PORT
const SECRE_ROUNDS = Number(process.env.SECRE_ROUNDS)
const SECRET = process.env.SECRET
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI

module.exports = {
  MONGODB_URI,
  PORT,
  SECRE_ROUNDS,
  SECRET
}
