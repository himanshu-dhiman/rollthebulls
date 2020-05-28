const express = require("express");
const app = express();
const port = 3000;
var _ = require("lodash");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://himanshu:Password26%23@rollthebulls-fdbew.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true });

app.post("/users/create", async (req, res) => {
  const dbName = "rollthebulls";

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    console.log("Database:", db);

    const userCollection = db.collection("users");
    console.log("Users Collection:", userCollection);
  } catch (e) {
    console.log(err.stack);
  }
  res.status(200).send(req.body);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
