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
  jwtForPasswordRecovery: {
    secret: string;
    expiresIn: string;
  };
  email: {
    address: string;
    password: string;
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
  jwtForPasswordRecovery: {
    secret: process.env.JWT_SECRET_PASSWORD_RECOVER,
    expiresIn: process.env.JWT_EXPIRES_IN_PASSWORD_RECOVER,
  },
  email: {
    address: process.env.EMAIL_ADDRESS,
    password: process.env.EMAIL_PASSWORD,
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
