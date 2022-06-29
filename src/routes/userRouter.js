import logger from '../loggers/loggers.js'
import express from 'express'

import carritoDao from '../daos/carritosMongoDao.js'
import userMongoDao from '../daos/userDao.js'

import passport from 'passport'
import carritosMongoDao from '../daos/carritosMongoDao.js'

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


router.get('/shoppingCar', async (req, res) => {
    let user = req.user
    logger.logInfo.info(`Accessing carritos page for ${user}`)
    
    try{
        var userInfo = await userMongoDao.findUser(user.email)
    }
    catch(e){
        return res.end({error: e})
    }

    if(userInfo.shoppingCar == null){
        logger.logInfo.warn(`User does not have a shopping car`)
        //CreateCar for user
        logger.logInfo.info("Adding new car to user")
        let newCarId = await carritoDao.addShoppingCar()

        let addCarRes = await userMongoDao.addCarToUser(user, newCarId)
        if(!addCarRes){
            logger.logInfo.warn("Car was not added")

            return res.status(500).end({error: "car not added"})
        }
        userInfo.shoppingCar = newCarId
    }
    logger.logInfo.info(`User ${user} has car ${userInfo.shoppingCar}`)
    
    let products = await carritosMongoDao.getProdsInCar(userInfo.shoppingCar)
    logger.logInfo.info(`Products on car ${products?.length}`)

    return res.render('shoppingCar', {products: products? products: []})
})

export default router