const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("./routes/pin");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB connected...");
  })
  .catch((e) => console.log(e));

app.use("/api/pins", pinRoute);

app.listen(8800, () => {
  console.log("backend server is runnung...");
});
