import couchbaseConnection from "./connection";
import { EntryDB } from "../../types";

const { COUCHBASE_BUCKET } = process.env;

class Entry implements EntryDB {
  createEntry = async (entryKey: string, document: object) => {
    await couchbaseConnection.collection.insert(entryKey, document);
  };

  getEntries = async (tag?: any) => {
    const queryBase = `select meta().id, * from \`${COUCHBASE_BUCKET}\` where type = 'entry'`;
    const queryTag = tag ? ` and tag = '${tag}'` : "";
    const queryOrder = " order by url asc";

    const query = queryBase + queryTag + queryOrder;

    const result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows)
      .catch((err) => err);
    return result;
  };

  getEntry = async (entryKey: string) => couchbaseConnection.collection.get(entryKey);

  updateEntry = async (entryKey: string, updateObject: object) => {
    const updateArray = [];

    Object.entries(updateObject).forEach(([key, _value]) => {
      let value = _value;

      if (typeof value === "string") {
        value = `"${value}"`;
      }

      updateArray.push(`${key} = ${value}`);
    });

    const setQuery = updateArray.join(", ");

    const query = `UPDATE \`${COUCHBASE_BUCKET}\` e USE KEYS "${entryKey}" SET ${setQuery} RETURNING e`;

    const result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows[0])
      .catch((err) => err);

    return result;
  };

  deleteEntry = async (entryKey: string) => {
    const query = `DELETE FROM ${COUCHBASE_BUCKET} e USE KEYS "${entryKey}" RETURNING e`;

    const result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows[0])
      .catch((err) => err);
    return result;
  };

  getEntriesBySlackPreferences = async (scheduleTime: string) => {
    const query = `select meta().id, * from \`${COUCHBASE_BUCKET}\` where type = 'entry' and slack_${scheduleTime} and slackChannel IS VALUED order by url asc `;
    const result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows)
      .catch((err) => err);
    return result;
  };

  getEntryTags = async () => {
    const query = `SELECT DISTINCT(tag) FROM \`${COUCHBASE_BUCKET}\` WHERE type="entry" and tag IS VALUED`;
    const result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows)
      .catch((err) => err);
    return result;
  };
}

const EntryInstance = new Entry();

export default EntryInstance;
