//import loggers
import logger  from '../loggers/loggers.js'

import user from "../models/userModel.js";

import mongoose from "mongoose";
import config from "../config/config.js";

class userMongoDao {
  constructor() {
    logger.logInfo.info("DAO for users initialized");
    this.URL = config.mongoURL;
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

  findUser = async (username) => {
    logger.logInfo.info(`Query for user ${username}`);
    await this.connect2Db();
    let res;
    try {
      res = await user.findOne({ username: username });
    } catch (e) {
      logger.logInfo.error(e);
      return null;
    }
    if(!res){
      logger.logInfo.info(`User ${username} not found`);
      return null
    }
    logger.logInfo.info(`User found with id ${res._id}`);
    return res;
  }

  addUser = async (userInfo) => {
    logger.logInfo.info(`Adding user ${userInfo.username}`);
    await this.connect2Db();
    try {
      var res = await user.create(userInfo);
      mongoose.disconnect();
    } catch (err) {
      logger.logInfo.error(err);
      return null;
    }
    logger.logInfo.info(`new user ${userInfo.username} added`);
    return res.username;
  };

}

export default new userMongoDao()