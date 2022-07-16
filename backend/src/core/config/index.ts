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
  google: {
    callbackUrl: string;
    clientSecret: string;
    clientId: string;
  };
  clientUrl: string;
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
  google: {
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  clientUrl: process.env.CLIENT_URL,
};

export default config as Config;
