const express = require("express");
const app = express();
const port = 5000;
const contactRouter = require("./src/contact/router");
const userRouter = require("./src/user/router")
require("dotenv").config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use("/api/contact", contactRouter);
app.use("/api/user", userRouter);
const mongoose = require("mongoose");
mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then((result) => console.log("Connection Successful!"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`listening on port ${port}`));
