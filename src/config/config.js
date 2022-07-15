import "dotenv/config"

const pwd = encodeURIComponent(process.env.MONGOPWD)
  
const mongoURL  ='mongodb+srv://admin:' + pwd + '@cluster0.ii4wa.mongodb.net/ecommerce'

export default { mongoURL }