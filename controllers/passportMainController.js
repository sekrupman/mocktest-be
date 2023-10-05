// PANGGIL MODULE CRYPTO JS
const CryptoJs = require('crypto-js')
// PANGGIL USER MODEL NYA
// const { userModel } = require('../models/user')
const User = require('../models/user')
require('dotenv').config();

class PassportMainController {
    static async getRegisterPage (req, res) {
      try {
        // KALAU BISA KE AUTH --> login
        if (req.user) {
          return res.json({
            status: 'success',
            isLoggedIn: true,
            data: {
              // id: req.user.id,
              username: req.user.username,
              pin:req.user.pin
            }
          })
        } else {
          // KALAU NGGA MSH REGI
          return res.json({
            status: 'success',
            // isLoggedIn: false
            isLoggedIn: true
          })
        }
      } catch (error) {
        console.log(error)
        res.status(500).send('INTERNAL SERVER ERROR !')
      }
    }

    static async getLoginPage (req, res) {
        try {
          // KALAU BISA KE HALAMAN LAIN
          if (req.isAuthenticated()) {
            return res.json({
              status: 'success',
              // isLoggedIn: false
              isLoggedIn: true,
              data: {
                id: req.user.id,
                username: req.user.username,
                pin:req.user.pin
              }
            })
          } else {
            // KALAU NGGA TETAP HAL LOG
            return res.json({
              status: 'success',
              // isLoggedIn: false
              isLoggedIn: true
            })
          }
        } catch (error) {
          console.log(error)
          res.status(500).send(' INTERNAL SERVER ERROR !')
        }
      }

      static async postRegisterPage (req, res) {
        try {
          // AMBIL DATA YANG DIKASIH OLEH USER
          const data = req.body
          const username = data.username
          const pin = data.pin
          const confirmPin = data.confirm_pin
          // VALIDASI INPUT USER
          if (pin !== confirmPin) {
            return res.status(400).json({ status: 'failed', message: 'KODE PIN TIDAK SAMA' })
          }
          if (!validatePin(pin)) {
            return res.status(400).json({ status: 'failed', message: 'KODE PIN TIDAK BOLEH BERURUTAN DAN DUPLIKASI' })
          }
          // CEK APAKAH ADA DUPLIKASI USERNAME DI DB
          const userDataByUsername = await User.getData(username)
          if (userDataByUsername !== null) {
            return res.status(400).json({ status: 'failed', message: 'USERNAME SUDAH TERDAFTAR, SILAHKAN MENGGUNAKAN USERNAME LAIN' })
          }
          // HASH PIN
          // console.log('pin:', pin)
          // console.log('SECRET_LOGIN:', process.env.SECRET_LOGIN);
          const hashedPin = CryptoJs.HmacSHA256(pin, process.env.SECRET_LOGIN).toString()
          // INSERT EMAIL, USERNAME & PIN KE DATABASE
          // await User.insertData( username, hashedPin)
          // res.status(200).json({ status: 'success', message: 'DATA TELAH SUKSES TERDAFTAR' })
          // setTimeout(){
          //   1000
          // }
          await User.insertData(username, hashedPin);
          setTimeout(() => {
            res.status(200).json({ status: 'success', message: 'DATA TELAH SUKSES TERDAFTAR' });
          }, 1500);
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: 'INTERNAL SERVER EROR' })
        }
      }
}

// FUNCTION VALIDATE PIN
function validatePin(pin) {
    const regex = /^(?!.*(\d)\1)(?!123456|234567|345678|456789|567890)\d{6}$/;
    return regex.test(pin);
  }

module.exports = { PassportMainController }