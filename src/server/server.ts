const express = require("express");
const path = require("path");
const app = express();
import * as dataController from "./controllers/dataController";
// const dataController = require("./controllers/");

console.log(dataController);
require("dotenv").config();

app.use(express.json());

let data = [];

if (process.env.NODE_ENV === "production") {
  app.use("/public", express.static(path.join(__dirname, "../../public")));

  app.get("/", (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, "../../public/index.html"));
  });

  app.post("/fetching", dataController.getData, (req, res) => {
    data.push(res.locals.data);
    return res.status(200).json(res.locals.data);
  });

  // app.post("/test", testController.getSchema, (req: Request, res: Response) => {
  //   eval(res.locals.code);

  //   return res.status(200).json("ok");
  // });
}

app.listen(3000, () => {
  console.log("Server is running");
});
