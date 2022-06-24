import * as dotenv from 'dotenv';

dotenv.config();

export interface Config {
  origin: string;
  port: number;
  version: string;
  mongo: {
    uri: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  origin: process.env.ORIGIN,
  version: process.env.VERSION,
  mongo: {
    uri: process.env.MONGO_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  secret: process.env.SECRET,
};

export default config as Config;
