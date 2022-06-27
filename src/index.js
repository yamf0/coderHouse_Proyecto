import express from 'express'
import path from 'path'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import yargs from 'yargs'
import cluster from 'cluster'
import os from 'os'
import dotenv from 'dotenv'

//TO REPLACE __DIRNAME IN ES6
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//LOAD env vars
dotenv.config()

//INIT PASSPORT
import {} from './utils/passportConfig.js'

import productRouter from './routes/productos.js'
import carritoRouter from './routes/carrito.js'

import processRouter from './routes/processRouter.js'
import userRouter from './routes/userRouter.js'
import homeRouter from './routes/homeRouter.js'


//import loggers
import logger from './loggers/loggers.js'

const argv = yargs()
  .option('port', {
    alias: 'p',
    description: 'port to run',
    type: 'String'
  })
  .option('mode', {
    alias: 'm',
    description: 'mode od run',
    type: 'String'
  })
  .help()
  .alias('help', 'h').argv;

//SET PORT TO -p or 8080
const port = argv.port || 8080
//SET mode to FORK or -m
const MODO = argv.mode || 'FORK'

logger.logInfo.info(`Selected port: ${port}`)
logger.logInfo.info(`Selected mode: ${MODO}`)


if(MODO === 'CLUSTER' && cluster.isMaster){
    const numCpus = os.cpus().length
    logger.logInfo.info(`Cpus are ${numCpus}`)
    
    for(let i =0; i<numCpus; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker) =>{
        logger.logInfo.info(
            'worker',
            worker.process.pid,
            'died',
            new Date().toLocaleString()
        )
        cluster.fork()
    })
}
else{
    logger.logInfo.info("Entering else")
    const app = express()
    
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())

    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, 'views'));

    app.use(cookieParser())
    app.use(session({
        secret: process.env.SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 10, ///10 mins,
            //maxAge: 10000, //10 sec
            sameSite: false
        },
    }))


    app.use(passport.initialize())
    app.use(passport.session())

    app.use('/api/productos', productRouter)
    app.use('/api/carrito', carritoRouter)
    app.use("/api/user", userRouter)
    app.use("/api", processRouter)
    app.use("", homeRouter)

    app.listen(port,() => {
        logger.logInfo.info("server running")
    })
}
