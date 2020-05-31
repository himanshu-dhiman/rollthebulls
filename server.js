const express = require("express");
const app = express();
const port = 3000;
var _ = require("lodash");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const bcrypt = require("bcrypt");

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://himanshu:Password26%23@rollthebulls-fdbew.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true });

app.post("/users/create", async (req, res) => {
  const dbName = "rollthebulls";

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    //Database information printed on console
    //console.log("Database:", db);

    //Create collection called users to store userdata
    const userCollection = db.collection("users");
    //User Collection Information logged in console
    //console.log("Users Collection:", userCollection);

    //Store JSON object from request body to variable userdata
    var userdata = req.body

    //console.log("User Data:", userdata); Print all user data
    console.log("Name :", userdata.name);
    console.log("Email :", userdata.email);
    console.log("Password :", userdata.password);

    //Insert code for Validation here to check for inconsistency in user data

    //Code for password encryption
    var salt = 10;
    bcrypt.hash(userdata.password, salt, (err, encrypted) => {
      userdata.password = encrypted;
      });

    //Code to check password at login 
    /*   bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
        // redirect to location
        } else {
        res.send(‘Incorrect password’)
        // redirect to login page
        }
        }) */

    //Code to insert data into collection here
    userCollection.insertOne(userdata,
       function(err,res){
         if(err) throw err;
         console.log("1 document inserted");
       });

    //Print all the documents in the collection
    userCollection.find({}).toArray(function(err, result){
      if(err) throw err;
      console.log(result);
      //userCollection.close();
    });

  } catch (err) {
    console.log(err.stack);
  }
  res.status(200).send(req.body);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
