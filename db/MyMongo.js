import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

export function MyMongoDB() {
  const myDB = {};
  const mongoURL = process.env.REACT_APP_MONGO_URL || "mongodb://0.0.0.0:27017";
  const DB_NAME = "WeddingPlanner";
  const COL_NAME = "UserTask";

  myDB.getTasks = async (userid) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      await client.connect();
      const db = await client.db(DB_NAME);
      const col = await db.collection(COL_NAME);

      return await col
        .find({ userid: parseInt(userid) })
        .sort({ _id: -1 })
        .toArray();
    } finally {
      client.close();
    }
  };
  myDB.updateTask = async (updated) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      await client.connect();
      const db = await client.db(DB_NAME);
      const col = await db.collection(COL_NAME);
      return await col.updateOne(
        { taskid: parseInt(updated.taskid) },
        { $set: { task: updated.task } }
      );
    } finally {
      client.close();
    }
  };
  myDB.updateTaskComplete = async (taskid, val) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      await client.connect();
      const db = await client.db(DB_NAME);
      const col = await db.collection(COL_NAME);
      return await col.updateOne(
        { taskid: parseInt(taskid) },
        { $set: { complete: val } }
      );
    } finally {
      client.close();
    }
  };

  myDB.insertTask = async (task) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      await client.connect();
      const db = await client.db(DB_NAME);
      const col = await db.collection(COL_NAME);
      return await col.insertOne({
        userid: task.userid,
        task: task.task,
        taskid: task.taskid,
      });
    } finally {
      client.close();
    }
  };

  myDB.deleteTask = async (taskid) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      await client.connect();
      const db = await client.db(DB_NAME);
      const col = await db.collection(COL_NAME);
      return await col.deleteOne({ taskid: parseInt(taskid) });
    } finally {
      client.close();
    }
  };

  return myDB;
}
export default MyMongoDB();
