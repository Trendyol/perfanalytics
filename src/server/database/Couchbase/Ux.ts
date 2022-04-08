import { couchbaseConnection } from "./connection";
const { COUCHBASE_BUCKET } = process.env;
import { UxDB } from "../../types";

class _Ux implements UxDB {
  getUxByEntry = async (entryKey: string, date: string): Promise<any> => {
    const query = `SELECT meta().id, * FROM \`${COUCHBASE_BUCKET}\` where type = 'ux' and entryKey = '${entryKey}' and date = '${date}' order by date desc`;

    let result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows)
      .catch((err) => err);

    return result;
  };
  createUx = async (uxKey: string, document: {}): Promise<void> => {
    await couchbaseConnection.collection.insert(uxKey, document);
  };

  getUxDates = async (entryKey: string): Promise<void> => {
    const query = `SELECT date FROM \`${COUCHBASE_BUCKET}\` where type = 'ux' and entryKey = '${entryKey}' order by date limit 1`;

    let result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows)
      .catch((err) => err);

    return result;
  };
}

export const Ux = new _Ux();
