import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'gossip_ecommerce',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '1234',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    dialect: 'postgres',
    logging: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);



sequelize.sync({ force: false }).then(() => {
  console.log('Tablas sincronizadas');
}).catch((err) => {
  console.error('Error sincronizando tablas:', err);
});

export default sequelize;
