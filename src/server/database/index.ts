import * as Couchbase from "./Couchbase";
import * as MongoDB from "./MongoDB";
import mongodbConnection from "./MongoDB/connection";

// eslint-disable-next-line import/no-mutable-exports
let database = Couchbase;

const { DB_CONFIG } = process.env;

switch (DB_CONFIG) {
  case "couchbase":
    database = Couchbase;
    break;
  case "mongodb":
    mongodbConnection.init();
    database = MongoDB;
    break;
  default:
    break;
}
export default database;
