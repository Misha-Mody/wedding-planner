import { MongoClient } from "mongodb";
import config from "./config.json" assert { type: "json" };

export function MyMongoDB() {
  const myDB = {};
  const mongoURL = config.mongo.uri;
  const DB_NAME = "WeddingPlanner";
  const COL_NAME = "UserTask";

  myDB.getTasks = async (userid) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
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
      const col = client.db(DB_NAME).collection(COL_NAME);
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
      const col = client.db(DB_NAME).collection(COL_NAME);
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
      const col = client.db(DB_NAME).collection(COL_NAME);
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
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.deleteOne({ taskid: parseInt(taskid) });
    } finally {
      client.close();
    }
  };

  return myDB;
}
export default MyMongoDB();
