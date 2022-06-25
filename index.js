const express = require("express");
const app = express();
const port = 3000;
const contactRouter = require("./src/user/router");

app.use(express.json());

app.use("/api/v1", contactRouter);
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://nour-msh:nouna123@addressbookdb.y4ul6o7.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => console.log("Connection Successful!"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`listening on port ${port}`));
