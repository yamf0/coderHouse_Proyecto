import { carrito } from '../models/carritoModel.js';
import carritoDto from '../dto/carritoDto.js';

import mongoose from 'mongoose';
import config from '../config/config.js';

import loggers from '../loggers/loggers.js';

class carritoMongoDao{

  constructor(){
      loggers.logInfo.info("Dao de Carritos en Mongo inicializado")
      this.URL = config.mongoURL
      loggers.logInfo.info(`MonogUrl is ${this.URL}`)
  }

  connect2Db = async () => {
    loggers.logInfo.info("connecting to mongoDB atlas")
    
    try{
        await mongoose.connect(
            this.URL,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true
            })
    }catch(e){
        loggers.logInfo.error(e)
    }
  }

  addShoppingCar = async () => {
      loggers.logInfo.info("Adding new shopping car")
      await this.connect2Db() 
      let newCar = {
        "id": 1,
        "timestamp": Date.now(),
        "products": []
      }
      let cars = await this.getAllCars()
      if(cars.length != 0){
        const max = cars.reduce(function(prev, current) {
          return (prev.id > current.id) ? prev : current
        })
        newCar.id = parseInt(max.id) + 1
      }
      try{
        var res = await carrito.create(newCar)
        mongoose.disconnect()
      } catch(err){
          loggers.logInfo.info(err)
          return null
      }
      return newCar.id
  }

  delShoppingCar = async (id) => {
      loggers.logInfo.info("Removing Shopping car")
      await this.connect2Db() 
      let res
      try{
        res = await carrito.deleteOne({id: id})
        mongoose.disconnect()
      }catch(e){
        loggers.logInfo.error(e)
        return 1
      }
      return 0
  }
  getProdsInCar = async (id) => {
      loggers.logInfo.info("Getting products in car")
      await this.connect2Db() 
      let res
      try{
        res = await carrito.findOne({id: id})
        mongoose.disconnect()
      }catch(e){
        loggers.logInfo.error(e)
        return 1
      }
      loggers.logInfo.info(`Products in cart are ${res.productos}`)
      return res.products
  }
  addProduct = async (id, newProd) => {
      loggers.logInfo.info(`Adding product ${newProd} to Car ${id}`)
      await this.connect2Db() 
      let car
      try{
          car = await carrito.findOne({id: id})
      }catch(e){
        loggers.logInfo.error(e)
        return 1
      }
      loggers.logInfo.info("Adding product to car")
      if(car.products.length != 0){
        const max = car.products.reduce(function(prev, current) {
          return (prev.id > current.id) ? prev : current
        })
        newProd.id = parseInt(max.id) + 1
      }
      else{
        newProd.id = 1
      }
      car.products.push(newProd)
      loggers.logInfo.info(car.products)
      let res
      try{
          res = await carrito.updateOne({id: id}, car)
          mongoose.disconnect()
      }catch(e){
        loggers.logInfo.error(e)
        return 1
      }
      loggers.logInfo.info(`Product added with Id ${newProd.id}`)
      return 0      
  }
  
  delProduct = async (idCar, idProd) => {
      loggers.logInfo.info("Removing product")
      await this.connect2Db() 
      let res
      try{
          res = await carrito.updateOne({id: idCar},
            {$pull: {products: {id: idProd}}})
            loggers.logInfo.info(res)
          mongoose.disconnect()
        }catch(e){
          loggers.logInfo.error(e)
          return 1
      }
      
      return 0
  }

  getAllCars = async () => {
      loggers.logInfo.info("Retrieving all cars")
      await this.connect2Db()     
      let res
      try{
        res = await carrito.find({})
      }catch(e){
        loggers.logInfo.error(e)
        return null
      }
      loggers.logInfo.info("Cars List retrieved")

      const carritosList = []
      res.forEach(car => {
        carritosList.push(new carritoDto(car))
      })
      
      return carritosList

  }

}


export default carritoMongoDao

//const ob = new productMongoDao()
/* ob.addProduct({
    "nombre": "flauta",
    "descripcion": "instrumento para tocar unas rolitas",
    "codigo": "SDFGHJQW123",
    "url": "www.google.com",
    "stock": 40,
    "id": 1,
    "precio": 203

}).then(res => loggers.logInfo.info(res))  */

//ob.getProduct(1).then(prod => loggers.logInfo.info(prod))
//ob.delProduct(1).then(prod => loggers.logInfo.info(prod))
