import passport from 'passport'

import {Strategy as localStrategy}  from 'passport-local'
import encryptUtils  from '../utils/encryptPassword.js'
import userDao from '../daos/userDao.js'
import logger from '../loggers/loggers.js'
import {sendRegistrationEmail} from './messagingUtils.js'

passport.use('register',
    new localStrategy(
        {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            logger.logInfo.info(email)
            const userExists =  await userDao.findUser(email)

            if(userExists){
                //User exists in DB no registration needed
                logger.logInfo.info(`User ${email} already registered`)
                return done(null, userExists)
            } else{
                //Encryt pwd and register user
                logger.logInfo.info(`User ${email} is not registered`)                
                const user = { 
                    email: email,
                    password: password,
                    name: req.body.name,
                    address: req.body.address,
                    age: req.body.age,
                    countryCode: req.body.countryCode,
                    phone: req.body.phone,
                    photo: req.body.photo
                } 

                logger.logInfo.info(`photo ${user.photo} registered`)
                user.password = await encryptUtils.encrypt(user.password)
                
                const res = await userDao.addUser(user)
                logger.logInfo.info(`User ${res} registered`)
                //console.log(await userModel.find({}).count())
                try{
                    logger.logInfo.info(`Sending registration Email`)

                    await sendRegistrationEmail()
                }
                catch(e){
                    logger.logError.error(e)
                }
                return done(null, user)
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy(
        {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
        logger.logInfo.info("Login")
        const user =  await userDao.findUser(email)
        logger.logInfo.info(`Registered user ${user?.email}`)
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
    let userFound = await userDao.findUser(user.email)
    if (!userFound) {
        return done(new Error('user not found'), user);
    }
    done(null, userFound);
})
