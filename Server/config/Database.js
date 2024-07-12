import config from "./config.js";
import { Sequelize } from "sequelize";
const connectDB = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: console.log, 
});

export default connectDB;
