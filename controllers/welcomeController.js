class WelcomePageController {
    static async welcome (req, res) {
      return res.send('WELCOME TO TODO APP API !!!')
    }
  }
  
  module.exports = { WelcomePageController }
  