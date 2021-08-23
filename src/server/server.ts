import express from "express";
import path from "path";
import * as dataController from "./controllers/dataController";

// const expressPlayground =
//   require("graphql-playground-middleware-express").default;

const app: express.Application = express();
require("dotenv").config();

// const expressGraphQL = require("express-graphql").graphqlHTTP;
// const {
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLList,
//   GraphQLNonNull,
//   GraphQLInt,
//   GraphQLString
// } = require("graphql");

app.use(express.json());

let data = [];

if (process.env.NODE_ENV === "production") {
  app.use("/public", express.static(path.join(__dirname, "../../public")));

  app.get("/", (req: express.Request, res: express.Response) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, "../../public/index.html"));
  });

  app.post(
    "/fetching",
    dataController.getData,
    (req: express.Request, res: express.Response) => {
      data.push(res.locals.data);
      return res.status(200).json(res.locals.data);
    }
  );

  // app.post("/test", testController.getSchema, (req: Request, res: Response) => {
  //   eval(res.locals.code);

  //   return res.status(200).json("ok");
  // });
}

app.listen(3000, () => {
  console.log("Server is running");
});
