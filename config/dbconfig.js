const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("DB DONE");
});

connection.on("error", (error) => {
  // Define 'error' here
  console.log("Error", error);
});

module.exports = mongoose;
