import * as dotenv from 'dotenv';

dotenv.config();

export interface Config {
  mongo: {
    uri: string;
  };
  couchbase: {
    connectionString: string;
    bucketName: string;
    username: string;
    password: string;
  };
  database: string;
}

export const config = {
  mongo: {
    uri: process.env.MONGO_URL,
  },
  couchbase: {
    connectionString: process.env.CB_CONNECTION_STRING,
    bucketName: process.env.CB_BUCKET_NAME,
    username: process.env.CB_USERNAME,
    password: process.env.CB_PASSWORD,
  },
  database: process.env.DATABASE,
};

export default config as Config;
