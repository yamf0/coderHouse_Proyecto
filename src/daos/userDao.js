//import loggers
import logger  from '../loggers/loggers.js'

import user from "../models/userModel.js";
import userDto from '../dto/userDto.js';

import mongoose from "mongoose";
import config from "../config/config.js";

class userMongoDao {
  constructor() {
    logger.logInfo.info("DAO for users initialized");
    this.URL = config.mongoURL;
    logger.logInfo.info(`MonogUrl is ${this.URL}`)
  }

  connect2Db = async () => {
    logger.logInfo.info("connecting to mongoDB atlas");

    try {
      await mongoose.connect(this.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      logger.logInfo.error(e);
    }
  };

  findUser = async (email) => {
    logger.logInfo.info(`Query for user ${email}`);
    await this.connect2Db();
    let res;
    try {
      res = await user.findOne({ email: email });
    } catch (e) {
      logger.logInfo.error(e);
      return null;
    }
    if(!res){
      logger.logInfo.info(`User ${email} not found`);
      return null
    }
    logger.logInfo.info(`User found with id ${res._id}`);

    const userObj = userDto(res)

    return userObj;
  }

  addUser = async (userInfo) => {
    logger.logInfo.info(`Adding user ${userInfo.email}`);
    await this.connect2Db();
    try {
      var res = await user.create(userInfo);
      mongoose.disconnect();
    } catch (err) {
      logger.logInfo.error(err);
      return null;
    }
    logger.logInfo.info(`new user ${userInfo.email} added`);
    return res.email;
  };

  addCarToUser = async(email, shoppingCar) =>{
    logger.logInfo.info(`Adding carId ${shoppingCar} to user ${email}`)
    
    await this.connect2Db();
    try {
      var res = await user.updateOne({email: email},
        {"$set": {shoppingCar: shoppingCar}});
      mongoose.disconnect();
    } catch (err) {
      logger.logInfo.error(err);
      return null;
    }
    logger.logInfo.info(`User shoppingCar update acknowledged ${res.acknowledged}`);
    return res.modifiedCount;

  }

}

export default userMongoDao