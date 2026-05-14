import dotenv from 'dotenv';
dotenv.config();

export const env = {
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-in-prod',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '2h',
  PORT: parseInt(process.env.PORT || '3000', 10),
};

export default env;
