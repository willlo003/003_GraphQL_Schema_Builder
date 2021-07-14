import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import * as dataController from './controllers/dataController';


const app: Application = express();
const cors = require("cors");
// const expressGraphQL = require("express-graphql").graphqlHTTP;
// const {
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLList,
//   GraphQLNonNull,
//   GraphQLInt
// } = require("graphql");


app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000"],
    credentials: true,
  })
);

// const books = [
//   { id: 1, name: "Harry Potter and the Chamber of Secrets", authorId: 1 },
//   { id: 2, name: "Harry Potter and the Prisoner of Azkaban", authorId: 1 },
//   { id: 3, name: "Harry Potter and the Goblet of Fire", authorId: 1 },
//   { id: 4, name: "The Fellowship of the Ring", authorId: 2 },
//   { id: 5, name: "The Two Towers", authorId: 2 },
//   { id: 6, name: "The Return of the King", authorId: 2 },
//   { id: 7, name: "The Way of Shadows", authorId: 3 },
//   { id: 8, name: "Beyond the Shadows", authorId: 3 },
// ];
// const dataType = new GraphQLObjectType({
//   name: "Data",
//   description: "This represents a book written by an author",
//   fields: () => ({
//     // id: {
//     //   type: GraphQLNonNull(GraphQLInt),
//     // },
//   }),
// });

// const RootQueryType = new GraphQLObjectType({
//   name: "Query",
//   description: "Root Query",
//   fields: () => ({
//     data: {
//       type: new GraphQLList(dataType),
//       description: "List of All Data",
//       resolve: () => books
//     }
//   }),
// });

// const schema = new GraphQLSchema({
//   query: RootQueryType,
// });

if (process.env.NODE_ENV === "production") {
  app.use("/public", express.static(path.join(__dirname, "../../public")))

  app.get('/', (req: Request, res: Response) => {
    return res.status(200).sendFile(path.join(__dirname, "../../public/index.html"))
  })

  app.post('/fetching', dataController.getData, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.data)
  })



  //   app.use(
  //     "/graphql",
  //     expressGraphQL({
  //       schema: schema,
  //       graphiql: true,
  //     })
  //   );
}

app.listen(3000, () => {
  console.log("Server is running")
});