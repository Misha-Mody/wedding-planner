import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

export function MyCardMongo() {
  const myDB2 = {};
  const mongoURL = process.env.REACT_APP_MONGO_URL;
  const DB_NAME = "WeddingPlanner";
  const COL_NAME = "Cards";

  myDB2.getCard = async (userid) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.find({ userid: parseInt(userid) }).toArray();
    } finally {
      client.close();
    }
  };

  myDB2.insertCard = async (card) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.insertOne({
        userid: card.userid,
        cardid: card.cardid,
        bride: card.bride,
        groom: card.groom,
        date: card.date,
        time: card.time,
        venue: card.venue,
        theme: card.theme,
      });
    } finally {
      client.close();
    }
  };

  myDB2.deleteCard = async (cardid) => {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const col = client.db(DB_NAME).collection(COL_NAME);
      return await col.deleteOne({ cardid: parseInt(cardid) });
    } finally {
      client.close();
    }
  };

  return myDB2;
}
export default MyCardMongo();
