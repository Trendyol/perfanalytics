import * as dotenv from 'dotenv';

dotenv.config();

export interface Config {
  mongo: {
    uri: string;
  };
}

export const config = {
  mongo: {
    uri: process.env.MONGO_URL,
  },
};

export default config as Config;
