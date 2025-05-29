const mongoose = require("mongoose");
require("dotenv").config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;
const dbName = process.env.MONGO_DB;

const mongo_url = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongo_url)
    .then(() => {
        console.log("MongoDB connected...");
    })
    .catch((err) => {
        console.log("MongoDB Connection error:", err);
    });