import express from 'express'

import contenedorProductos from '../utils/contenedorProductos'

const router = express.Router()


router.get('/', (req, res) => {
    res.status(200).send('route at products')
})

//Routes
router.get('/:id', async (req, res)=> {
    let id = req.params.id
    let product = await contenedorProductos.getProduct(id)
    if(product){
        return res.send(product);
    }
    return res.status(204).end();
})

router.post('/', async (req, res)=> {
    let producto = req.body
    let resContainer = await contenedorProductos.addProduct(producto)
    if(resContainer == 3){
        return res.status(500).send({message: "Product not added"});
    }
    return res.status(201).send({message: "Product added"});
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    let resContainer = await contenedorProductos.delProduct(id)
    if(resContainer){
        return res.status(204).send({message: "Product not found"});
    }
    else if(resContainer == 3){
        console.log("Error while saving file")
    }
    return res.status(200).send({message: "Product deleted"});
})

router.put('/:id', async (req, res)=> {
    let id = req.params.id
    let producto = req.body
    let resContainer = await contenedorProductos.updateProduct(id, producto)
    if(resContainer){
        return res.status(204).send({message: "Product not found"});
    }
    else if(resContainer == 3){
        console.log("Error while saving file")
    }
    return res.status(201).send({message: "Product updated"});
})


export default router