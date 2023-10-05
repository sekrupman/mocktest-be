const passport = require('passport')
const CryptoJs = require('crypto-js')
const LocalStrategy = require('passport-local').Strategy
const { userModel } = require('../models/user')
const user = require('../models/user')

async function authenticate (username, pin, done) {
  try {
    // AMBIL DATA USERNYA
    const userData = await user.getData(username)
    // HANDLE DATA USER YANG TIDAK ADA
    if (userData === null) {
      return done(null, false, { message: 'USERNAME NOT FOUND' })
    }
    // BANDINGKAN PIN
    const hashedPin = CryptoJs.HmacSHA256(pin, process.env.SECRET_LOGIN).toString()
    if (hashedPin !== userData.pin) {
      return done(null, false, { message: 'PIN SALAH' })
    }
    // MASUKKAN DATA USER KE PASSPORT
    delete userData.pin
    return done(null, userData)
  } catch (error) {
    console.log(error)
    return done(error, false, { message: err.message })
  }
}

passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'pin' }, authenticate))

passport.serializeUser(
  (user, done) => done(null, user.id)
)
// passport.deserializeUser(
//   async function (id, done) {
//     return done(null, await userModel.getDataByPk(id))
//   }
// )

module.exports = passport
