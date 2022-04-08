import { couchbaseConnection } from "./connection";
const { COUCHBASE_BUCKET } = process.env;
import { EntryDB } from "../../types";

class _Entry implements EntryDB {
  createEntry = async (entryKey: string, document: {}) => {
    await couchbaseConnection.collection.insert(entryKey, document);
  };

  getEntries = async (tag?: any) => {
    const queryBase = `select meta().id, * from \`${COUCHBASE_BUCKET}\` where type = 'entry'`;
    const queryTag = tag ? ` and tag = '${tag}'` : "";
    const queryOrder = ` order by url asc`;

    const query = queryBase + queryTag + queryOrder;

    let result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows)
      .catch((err) => err);
    return result;
  };

  getEntry = async (entryKey: string) => {
    return await couchbaseConnection.collection.get(entryKey);
  };

  updateEntry = async (entryKey: string, updateObject: {}) => {
    const updateArray = [];

    for (let [key, value] of Object.entries(updateObject)) {
      if (typeof value == "string") {
        value = `"${value}"`;
      }
      updateArray.push(`${key} = ${value}`);
    }
    const setQuery = updateArray.join(", ");

    const query = `UPDATE \`${COUCHBASE_BUCKET}\` e USE KEYS "${entryKey}" SET ${setQuery} RETURNING e`;

    let result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows[0])
      .catch((err) => err);

    return result;
  };

  deleteEntry = async (entryKey: string) => {
    const query = `DELETE FROM ${COUCHBASE_BUCKET} e USE KEYS "${entryKey}" RETURNING e`;

    let result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows[0])
      .catch((err) => err);
    return result;
  };

  getEntriesBySlackPreferences = async (scheduleTime: string) => {
    const query = `select meta().id, * from \`${COUCHBASE_BUCKET}\` where type = 'entry' and slack_${scheduleTime} and slackChannel IS VALUED order by url asc `;
    let result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows)
      .catch((err) => err);
    return result;
  };

  getEntryTags = async () => {
    const query = `SELECT DISTINCT(tag) FROM \`${COUCHBASE_BUCKET}\` WHERE type="entry" and tag IS VALUED`;
    let result = await couchbaseConnection.cluster
      .query(query)
      .then((res) => res.rows)
      .catch((err) => err);
    return result;
  };
}

export const Entry = new _Entry();
