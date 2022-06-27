import logger from '../loggers/loggers.js'
import express from 'express'

import encryptUtils from "../utils/encryptPassword.js"
import userModel from "../models/userModel.js"
import passport from 'passport'

// Single routing
var router = express.Router()

router.post('/register', passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register/error'
}))

router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login/error'
}))

export default router