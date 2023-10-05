var express = require('express');
var router = express.Router();
const passport = require('../lib/passport')


// IMPORT CONTROLLER
const { WelcomePageController } =  require ('../controllers/welcomeController');
const {PassportMainController} = require('../controllers/passportMainController');
const {UserController} = require('../controllers/userController');
const {TodoController} = require('../controllers/todoController');
const {ProfileModel} = require('../models/profile')

/* WELCOME PAGE */
router.get('/', WelcomePageController.welcome)

/* REGISTER PAGE */
router.get('/register', PassportMainController.getRegisterPage)
router.post('/register', PassportMainController.postRegisterPage)

/* LOGIN PAGE */
router.get('/login', PassportMainController.getLoginPage)
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect username or password',
      });
    }

    req.login(user, async function (err) {
      if (err) {
        return next(err)
      }
      res.status(200).json({
        status: 'success',
        data: {
          id: req.user.id,
          username: req.user.username,
        }
      })
    })
  })(req, res, next)
})

router.get('/api/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userData = await ProfileModel.getUserData(userId);
    // console.log('userdata:', userData)
    
    if (userData) {
      res.json({ username: userData.username });
      // console.log('username:', username)
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// AMBIL DATA PROFILE USER
// router.get('/profile/get/:id', UserController.getProfilePage)

// DASHBOARD PAGE
router.get('/dashboard/:userId', PassportMainController.getLoginPage)
router.get('/api/tasks/:userId', TodoController.getUserTasks);
router.post('/api/tasks/create/:userId', TodoController.createTask);
router.delete('/api/tasks/delete/:id', TodoController.deleteTask);

module.exports = router;