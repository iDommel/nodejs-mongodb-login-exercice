import express from "express";
import  { readFile } from "fs";
import mongoose from "mongoose";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

await routes(app);
// db stuff

// DB_URI_ATLAS = "mongodb+srv://iona:123@cluster0.qzcnq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose
  .connect(process.env.DB_URI_ATLAS)
  .then(() => {
    console.log("Listening on port: " + PORT);
    app.listen(PORT);
  })
  .catch((err) => {
    console.log("error");
  });


// Home

app.get("/", async (req, res) => {
  try {
    res.send(await readFile("./views/home.html", "utf-8"));
  } catch (err) {
    res.status(500).send();
  }
});