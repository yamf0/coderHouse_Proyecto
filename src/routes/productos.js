
import express from 'express'

import productDao from '../daos/productsDao.js'
import cookieAuth from '../utils/authUtils.js'

//import loggers
import logger from '../loggers/loggers.js'
import { render } from 'pug'

const router = express.Router()

router.get('/', async (req, res) => {
    let products = await productDao.getAllProd()
    if(products){
        return res.send(products);
    }
    return res.status(500).end();
})

//Routes
router.get('/getProd/:id', async (req, res)=> {
    let id = req.params.id
    let product = await productDao.getProduct(id)
    if(product){
        return res.send(product);
    }
    return res.status(204).end();
})

router.post('/', cookieAuth(), async (req, res, next)=> {
    let producto = req.body
    let resContainer = await productDao.addProduct(producto)
    if(resContainer == 3){
        return res.status(500).send({message: "Product not added"});
    }
    return res.status(201).send({message: "Product added", id: producto.id});
})

router.delete('/:id', cookieAuth(), async (req, res, next) => {
    let id = req.params.id
    let resContainer = await productDao.delProduct(id)
    if(resContainer){
        return res.status(204).send({message: "Product not found"});
    }
    else if(resContainer == 3){
        logger.logError.error("Error while saving file")
    }
    return res.status(200).send({message: "Product deleted"});
})

router.put('/:id', cookieAuth(), async (req, res, next)=> {
    let id = req.params.id
    let producto = req.body
    let resContainer = await productDao.updateProduct(id, producto)
    if(resContainer){
        return res.status(204).send({message: "Product not found"});
    }
    else if(resContainer == 3){
        logger.logError.error("Error while saving file")
    }
    return res.status(201).send({message: "Product updated"});
})

router.get('/productsPage', async (req, res) => {
    let user = req.user
    let products = await productDao.getAllProd()
    logger.logInfo.info("Accessing   page")
    if(products){
        return res.render('products', {products: products, carritoId: user.shoppingCar})
    }
    return res.status(500).end();
})

export default router