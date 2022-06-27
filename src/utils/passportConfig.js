import passport from 'passport'

import {Strategy as localStrategy}  from 'passport-local'
import encryptUtils  from '../utils/encryptPassword.js'
import userDao from '../daos/userDao.js'
import logger from '../loggers/loggers.js'

passport.use('register',
    new localStrategy(
        {passReqToCallback: true},
        async (req, username, password, done) => {
            logger.logInfo.info(username)
            const userExists =  await userDao.findUser(username)

            if(userExists){
                //User exists in DB no registration needed
                logger.logInfo.info(`User ${username} already registered`)
                return done(null, false)
            } else{
                //Encryt pwd and register user
                logger.logInfo.info(`User ${username} is not registered`)
                
                const user = { username: username, password: password}
                
                user.password = await encryptUtils.encrypt(user.password)
                
                const res = await userDao.addUser(user)
                logger.logInfo.info(`User ${res} registered`)
                //console.log(await userModel.find({}).count())
                return done(null, user.username)
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy(async ( username, password, done) => {
        logger.logInfo.info("Login")
        const user =  await userDao.findUser(username)
        logger.logInfo.info(`Registered user ${user?.username}`)
        if (user) {
            const validPwd = await encryptUtils.compare(password, user.password)
        // check user password with hashed password stored in the database
            if (validPwd) {
                logger.logInfo.info("pwd correct, logging in")
                return done(null, user)
            } 
        }
        logger.logInfo.warn("login failed")
        return done(null, false)
    })
)

passport.serializeUser((user, done) => {
    logger.logInfo.info(`serializing user ${user}`)
    done(null, user)
})

passport.deserializeUser(async (user, done) => {
    logger.logInfo.info(`deserializing user ${user}`)
    let userFound = await userDao.findUser(user.username)
    if (!userFound) {
        return done(new Error('user not found'), user);
    }
    done(null, userFound);
})
