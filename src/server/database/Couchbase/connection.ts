import * as couchbase from "couchbase";
import dotenv from "dotenv";

dotenv.config();

const { COUCHBASE_HOST, COUCHBASE_USERNAME, COUCHBASE_PASSWORD, COUCHBASE_BUCKET } = process.env;

class CouchbaseConnection {
  public cluster;

  public collection;

  public init() {
    return this.connect()
      .then((cluster) => {
        this.cluster = cluster;
        const bucket = couchbaseConnection.cluster.bucket(COUCHBASE_BUCKET);
        this.collection = bucket.defaultCollection();
      })
      .catch((err) => console.log(err));
  }

  public connect() {
    return couchbase.connect(COUCHBASE_HOST, {
      username: COUCHBASE_USERNAME,
      password: COUCHBASE_PASSWORD,
    });
  }
}

const couchbaseConnection = new CouchbaseConnection();
couchbaseConnection.init();

export default couchbaseConnection;
