const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception i.e we are loging something which is undefined
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server to Uncaught Exception`);
  process.exit(1);
});
// Config
dotenv.config({ path: "backend/config/config.env" });

//Connecting To database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection(Some Problem in the link or other stuff)
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejecction`);

  server.close(() => {
    process.exit(1);
  });
});
