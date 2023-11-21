const router = require('express').Router()
const userCtrl = require('../controllers/userController.js')
const auth = require('../middleware/auth')

// Register User
router.post('/signup', userCtrl.registerUser)
// Login User
router.post('/login', userCtrl.loginUser)

// verify Token
router.get('/verify', userCtrl.verifiedToken)

module.exports = router