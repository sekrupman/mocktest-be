const { Sequelize } = require('sequelize')

// get models
const  User  = require('../models/user')

class ProfileModel {
    // get all user profile data
    static async getUserData (id) {
      try {
        // const userTable = await User.getModel()

        const dataUser = await User.findOne({
            where: {
              id,
            },
            attributes: [
              'id',
              'username'],
              raw:true
            })
            // console.log('datauser:', dataUser)
            return dataUser
        }catch(error) {
            console.log(error)
            return(error)
        }
    }
}

module.exports = {ProfileModel}
        