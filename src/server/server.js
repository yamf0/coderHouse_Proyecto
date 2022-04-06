import express from 'express'
import productRouter from './routes/productos'
import carritoRouter from './routes/carrito'

const PORT = 8080
let app = express()

app.use(express.json())

app.use('/api/productos', productRouter)
app.use('/api/carrito', carritoRouter)


app.listen(PORT, () => {
    console.log("express running")
})