import "dotenv/config"
const pwd = process.env.PWD
  
const mongoURL  =`mongodb+srv://admin:${pwd}@cluster0.ii4wa.mongodb.net/ecommerce`
export default { mongoURL }