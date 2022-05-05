import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_CONNECTION_URL } = process.env;

class MongodbConnection {
  public init() {
    return this.connect()
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((err) => console.log(err));
  }

  public async connect() {
    return mongoose.connect(MONGODB_CONNECTION_URL);
  }
}

const mongodbConnection = new MongodbConnection();

export default mongodbConnection;
