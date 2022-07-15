import { createTransport } from "nodemailer"
import twilio from "twilio"
import "dotenv/config"

import logger from "../loggers/loggers.js"

const accountSid = process.env.ACCSID
const authToken = process.env.AUTHTOKEN

const client = twilio(accountSid, authToken)

const sendCheckoutMessage = async(user, products) =>{ 
    try{
        const msg = await client.messages.create({
        body: `Thanks for your purchase! We are processing your request ${user.name}`,
        to: '+523314576691', // Text this number
        from: '+17179997641' // From a valid Twilio number
        })  
        logger.logInfo.info(msg)}
    catch(e){
        logger.logInfo.error(e)
    }
}

client.messages
  .create({
    body: 'Hello from Node',
    to: '+12345678901', // Text this number
    from: '+12345678901', // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));


const testEmail = "marjorie.rowe84@ethereal.email"

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'marjorie.rowe84@ethereal.email',
        pass: 'ybCVj8KAqR7HtDsmSH'
    }
});

const sendRegistrationEmail = async() =>{
    const mailOptions = {
            from: 'coderHouse Proyecto', // Sender address
            to: testEmail, // List of recipients
            subject: 'Registration', // Subject line
            text: 'Welcome to our platform!', // Plain text body
    }
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          logger.logError.error(err)
        } else {
          logger.logInfo.info("succesfully sent email");
        }
    });
}

const sendCheckoutEmail = async(user, products) =>{
    const mailOptions = {
            from: 'CoderHouse Proyecto', // Sender address
            to: testEmail, // List of recipients
            subject: 'nuevo pedido de' + user.name + " " + user.email , // Subject line
            text: `Thanks for your purchase of ${products}`, // Plain text body
    }
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          logger.logError.error(err)
        } else {
          logger.logInfo.info("succesfully sent email");
        }
    });
}

export {sendRegistrationEmail, sendCheckoutEmail, sendCheckoutMessage}