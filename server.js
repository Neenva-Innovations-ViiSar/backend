require("dotenv").config(); // So you can use your .env file
const mongoose = require("mongoose");

// Connect to MongoDB
const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
  .then(async () => {
    console.log("✅ MongoDB connected.");

    try {
      // Drop the index on 'phonenumber' from 'users' collection
      const result = await mongoose.connection.db.collection("users").dropIndex("phonenumber_1");
      console.log("✅ Index dropped:", result);
    } catch (err) {
      console.error("❌ Error:", err.message);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });
