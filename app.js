const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
require("express-async-errors");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");

mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
