import "dotenv/config"

import productMongoDao from '../daos/productsDao.js'
import carritoDao from '../daos/carritosMongoDao.js'
import userMongoDao from '../daos/userDao.js'
import { ThisMonthInstance } from "twilio/lib/rest/api/v2010/account/usage/record/thisMonth.js"

const daoType = process.env.daoType

class daoFactory{
    constructor(daoType){
        this.daos = {}
    }
    createDaoObjects(daoType){
        if (this.daos?.daoType){
            return this.daos.daoType
        }
        else if(daoType === 'mongo'){
            this.daos[daoType] = {
                productDao: new productMongoDao(),
                carritoDao: new carritoDao(),
                userDao: new userMongoDao()
            }
            return this.daos[daoType]
        }
        else{

            this.daos[daoType] = {
                productDao: new productMongoDao(),
                carritoDao: new carritoDao(),
                userDao: new userMongoDao()
            }
            return this.daos[daoType]
        }
    }
}

export const daoFactoryObj =  new daoFactory(daoType)
export const objectsDaos = daoFactoryObj.createDaoObjects(daoType)
