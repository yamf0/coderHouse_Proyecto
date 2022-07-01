import logger from '../loggers/loggers.js'
import express from 'express'

import carritoDao from '../daos/carritosMongoDao.js'
import userMongoDao from '../daos/userDao.js'

import passport from 'passport'
import carritosMongoDao from '../daos/carritosMongoDao.js'
import {sendCheckoutEmail, sendCheckoutMessage} from '../utils/messagingUtils.js'
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

        let addCarRes = await userMongoDao.addCarToUser(userInfo.email, newCarId)
        if(!addCarRes){
            logger.logInfo.warn("Car was not added")

            return res.status(500).end({error: "car not added"})
        }
        userInfo.shoppingCar = newCarId
    }
    logger.logInfo.info(`User ${user} has car ${userInfo.shoppingCar}`)
    
    let products = await carritosMongoDao.getProdsInCar(userInfo.shoppingCar)
    logger.logInfo.info(`Products on car ${products?.length}`)

    let totalProds = products?.length
    let price = await products.reduce((prevProd, curProd) => {
        let suma = parseInt(prevProd.precio) + parseInt(curProd.precio)
        return suma
    })

    return res.render('shoppingCar', {products: products? products: [], price: price, totalProds: totalProds})
})

router.post('/buyShoppingCart', async(req, res) =>{
    logger.logInfo.info("user is buying car")
    let price = req.body.price
    let products = req.body.prods
    logger.logInfo.info(`products list ${products}`)
    
    try{
        logger.logInfo.info(`Sending Checkout Email`)

        await sendCheckoutEmail(req.user, products)
    }
    catch(e){
        logger.logInfo.error(e)
    }
    try{
        logger.logInfo.info(`Sending Checkout Message`)

        await sendCheckoutMessage(req.user, products)
    }
    catch(e){
        logger.logInfo.error(e)
    }

    res.render('checkout', {products: products? products: [], price: price})
})

export default router