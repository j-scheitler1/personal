const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "lineLeak";
const client = new MongoClient(url);
let db;
let nextUserId = 1;

// Connect to MongoDB once at the start
client.connect().then((connectedClient) => {
    console.log("Connected to MongoDB");
    db = connectedClient.db(dbName);
    
    // Initialize nextUserId to one more than the max existing user ID
    db.collection("users").find({}).sort({ id: -1 }).limit(1).toArray((err, users) => {
        if (users.length > 0) {
            nextUserId = users[0].id + 1;
        }
    });
});

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.get("/listUsers", async (req, res) => {
    console.log("Node connected successfully to GET MongoDB");
    const results = await db
        .collection("users")
        .find({})
        .limit(100)
        .toArray();
    res.status(200).send(results);
});

app.get("/:username", async (req, res) => {
    const name = req.params.username;
    const results = await db.collection("users").findOne({ "username": name });
    if (!results) res.status(404).send("Not Found");
    else res.status(200).send(results);
});

app.post("/addUser", async (req, res) => {
    try {
        const newUser = {
            "id": nextUserId,
            "email": req.body.email,
            "username": req.body.username,
            "password": req.body.password,
            "age": req.body.age,
            "bio": ""
        };
        await db.collection("users").insertOne(newUser);
        nextUserId += 1; // Increment ID for the next user
        res.status(200).send(newUser);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

app.delete("/deleteUser/:id", async (req, res) => {
    const userId = Number(req.params.id);
    const results = await db.collection("users").findOneAndDelete({ "id": userId });
    if (!results.value) res.status(404).send("Not Found");
    else res.status(200).send(results.value);
});

app.put("/updateBio/:id", async (req, res) => {
    const userId = Number(req.params.id);
    try {
        const newBio = req.body.bio;
        const results = await db
            .collection("users")
            .findOneAndUpdate({ "id": userId }, { $set: { "bio": newBio } }, { returnOriginal: false });
        res.status(200).send(results.value);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

app.put("/updatePassword/:id", async (req, res) => {
    const userId = Number(req.params.id);
    try {
        const newPassword = req.body.password;
        const results = await db.collection("users").findOneAndUpdate(
            { "id": userId },
            { $set: { "password": newPassword } },
            { returnOriginal: false }
        );
        res.status(200).send(results.value);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});
