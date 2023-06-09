const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// getting environment variables
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// get app file
const app = require("./app.js");

// connecting to database
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY 😄 😄 😄");
  });

// listening to server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`server is listening to port: ${port} 🔥🔥🔥🔥`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  // Heroku shutting down our app every 24 hours so we need  to shut down the app without leaving pending req
  console.log("SIGTEM RECIEVED . shutting down gracefully");
  server.close(() => {
    console.log("Process Terminated");
    // it will shutdown the server manually so we don't need to write process.exit()
  });
})
