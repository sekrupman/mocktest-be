const CryptoJS = require('crypto-js');
// const JWT = require('jsonwebtoken');
const { profilel, ProfileModel } = require('../models/profile');

class UserController{
    // get data dan biodata user
    static async getProfilePage (req, res) {
      try {
        // get all data related with user
        const userProfile = await ProfileModel.getUserData(Number(req.params.id))
          console.log('profile', userProfile)
        // send data
        return res.json({ status: 'success', data: userProfile })
      } catch (error) {
        console.log(error)
        res.status(500).send(' Internal Server Error !')
      }
    }
}

module.exports = {UserController}