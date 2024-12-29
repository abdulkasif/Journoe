//Installing dependency
const express = require('express')
const { signupController, signinController } = require('../controllers/AuthController')

//Using Router
const router = express.Router()

//routing endpoints
router.post('/signup',signupController)
router.post('/signin',signinController)

module.exports = router
    