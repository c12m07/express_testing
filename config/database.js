import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(
  'prueba1', 
  'postgres', 
  'postgres', 
  
  {
    host: 'localhost',
    dialect: 'postgres', 
    logging: false,
    port: '5432', 
    define: {
        timestamps: false 
    }
  }
);

export default db;