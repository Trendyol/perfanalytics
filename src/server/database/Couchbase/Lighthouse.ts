import couchbaseConnection from "./connection";
import { LighthouseDB } from "../../types";

const { COUCHBASE_BUCKET } = process.env;

class Lighthouse implements LighthouseDB {
  createLighthouse = async (lighthouseKey: string, document: object) => {
    await couchbaseConnection.collection.insert(lighthouseKey, document);
  };

  getByEntry = async (entryKey: string, startDate: string, endDate: string) => {
    const query = `SELECT meta().id, * FROM \`${COUCHBASE_BUCKET}\` where type = 'lighthouse' and entryKey = '${entryKey}' and date between ${startDate} and ${endDate} order by date desc`;

    const result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows)
      .catch((err) => err);

    return result;
  };

  getLighthouse = (lighthouse: string) => couchbaseConnection.collection.get(lighthouse);

  updateLighthouse = async (lighthouseKey: string, updateObject: object) => {
    const updateArray = [];

    Object.entries(updateObject).forEach(([key, _value]) => {
      let value = _value;

      if (typeof value === "string") {
        value = `"${value}"`;
      }
      updateArray.push(`${key} = ${value}`);
    });

    const setQuery = updateArray.join(", ");

    const query = `UPDATE \`${COUCHBASE_BUCKET}\` e USE KEYS "${lighthouseKey}" SET ${setQuery} RETURNING e`;

    const result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows[0])
      .catch((err) => err);

    return result;
  };

  getStatistics = async (entryKey: string, startDate?: number, endDate?: number, metrics?: any[]) => {
    const formattedMetrics = metrics.map((metric) => `avg(${metric}) as ${metric}`).join(", ");

    let query = `select ${formattedMetrics} from \`${COUCHBASE_BUCKET}\` where type = 'lighthouse' and entryKey = '${entryKey}'`;

    if (startDate && endDate) {
      query += ` and date between ${startDate} and ${endDate}`;
    }

    const result = await couchbaseConnection.cluster.query(query).then((res) => res.rows[0]);

    return result;
  };

  clearResults = async (entryKey: string) => {
    const query = `delete from \`${COUCHBASE_BUCKET}\` where type = 'lighthouse' and entryKey = '${entryKey}'`;

    const result = await couchbaseConnection.cluster.query(query).then((res) => {});

    return result;
  };
}

const LighthouseInstance = new Lighthouse();

export default LighthouseInstance;
