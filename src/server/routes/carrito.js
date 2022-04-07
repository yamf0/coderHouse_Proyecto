import express from 'express'

import contenedorCarrito from '../utils/contenedorCarrito'
import contenedorProductos from '../utils/contenedorProductos'

const router = express.Router()


router.get('/', (req, res) => {
    res.status(200).send('route at shoppingCars')
})

//Routes

router.post('/', async (req, res)=> {
    let resContainer = await contenedorCarrito.addShoppingCar()
    if(resContainer == 3){
        console.warn("Shopping car File is not saved") 
    }
    return res.status(201).send({message: "Car added", id: resContainer});
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    let resContainer = await contenedorCarrito.delShoppingCar(id)
    if(resContainer){
        return res.status(204).send({message: "Shopping Car not found"});
    }
    else if(resContainer == 3){
        console.log("Error while saving file")
    }
    return res.status(200).send({message: "Shopping car deleted"});
})

router.get('/:id/productos', async (req, res)=> {
    let id = req.params.id
    let product = await contenedorCarrito.getProdsInCar(id)
    if(product){
        return res.send(product);
    }
    return res.status(204).end();
})

router.post('/:idCar/productos/:idProd', async (req, res)=> {
    let idCar = req.params.idCar
    let idProd = req.params.idProd
    //Get porod by Id
    let newProd = await contenedorProductos.getProduct(idProd)
    if(!newProd){
        res.status(204).send({message: "Product does not exists"})
    }
    let resContainer = await contenedorCarrito.addProduct(idCar, newProd)
    if(resContainer){
        return res.status(204).send({message: "Shopping Car not found"});
    }
    else if(resContainer == 3){
        console.log("Error while saving file")
    }
    return res.status(201).send({message: "Shopping car updated"});
})

router.delete('/:idCar/productos/:idProd', async (req, res) => {
    let idCar = req.params.idCar
    let idProd = req.params.idProd
    let resContainer = await contenedorCarrito.delProduct(idCar, idProd)
    if(resContainer){
        return res.status(204).send({message: "Shopping Car not found or product not in the shopping car"});
    }
    else if(resContainer == 3){
        console.log("Error while saving file")
    }
    return res.status(200).send({message: "Product deleted from car"});
})


export default router