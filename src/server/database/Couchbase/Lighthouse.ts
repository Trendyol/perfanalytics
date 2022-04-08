import { couchbaseConnection } from "./connection";
const { COUCHBASE_BUCKET } = process.env;
import { LighthouseDB } from "../../types";

class _Lighthouse implements LighthouseDB {
  createLighthouse = async (lighthouseKey: string, document: {}) => {
    await couchbaseConnection.collection.insert(lighthouseKey, document);
  };

  getByEntry = async (entryKey: string, startDate: string, endDate: string) => {
    const query = `SELECT meta().id, * FROM \`${COUCHBASE_BUCKET}\` where type = 'lighthouse' and entryKey = '${entryKey}' and date between ${startDate} and ${endDate} order by date desc`;

    let result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows)
      .catch((err) => err);

    return result;
  };

  getLighthouse = async (lighthouse: string) => {
    return await couchbaseConnection.collection.get(lighthouse);
  };

  updateLighthouse = async (lighthouseKey: string, updateObject: {}) => {
    const updateArray = [];

    for (let [key, value] of Object.entries(updateObject)) {
      if (typeof value == "string") {
        value = `"${value}"`;
      }
      updateArray.push(`${key} = ${value}`);
    }
    const setQuery = updateArray.join(", ");

    const query = `UPDATE \`${COUCHBASE_BUCKET}\` e USE KEYS "${lighthouseKey}" SET ${setQuery} RETURNING e`;

    let result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows[0])
      .catch((err) => err);

    return result;
  };

  getStatistics = async (entryKey: string, startDate?: number, endDate?: number, metrics?: any[]) => {

    const formattedMetrics = metrics
      .map((metric) => {
        return `avg(${metric}) as ${metric}`;
      })
      .join(", ");


    let query = `select ${formattedMetrics} from \`${COUCHBASE_BUCKET}\` where type = 'lighthouse' and entryKey = '${entryKey}'`;

    if (startDate && endDate) {
      query += ` and date between ${startDate} and ${endDate}`;
    }

    let result = await couchbaseConnection.cluster.query(query).then((res) => {
      return res.rows[0]
    });

    return result;
  };

  clearResults = async (entryKey: string) => {
    let query = `delete from \`${COUCHBASE_BUCKET}\` where type = 'lighthouse' and entryKey = '${entryKey}'`;

    let result = await couchbaseConnection.cluster.query(query).then((res) => {});

    return result;
  };
}

export const Lighthouse = new _Lighthouse();
