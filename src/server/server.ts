import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import * as dataController from './controllers/dataController';
import * as testController from './controllers/testController';
const { buildSchema, getIntrospectionQuery, printSchema } = require("graphql")

const expressPlayground = require('graphql-playground-middleware-express')
    .default


const app: Application = express();
const cors = require("cors");
const expressGraphQL = require("express-graphql").graphqlHTTP;
// const {
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLList,
//   GraphQLNonNull,
//   GraphQLInt,
//   GraphQLString
// } = require("graphql");


app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000"],
    credentials: true,
  })
);

let data = [] ;
// const authors = [
//   { id: 1, name: "J. K. Rowling" },
//   { id: 2, name: "J. R. R. Tolkien" },
//   { id: 3, name: "Brent Weeks" },
// ];

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


// let Schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "HelloWorld",
//     fields: () => ({
//       message: { type: GraphQLString, resolve: () => "Hello FK" },
//     }),
//   }),
// });

if (process.env.NODE_ENV === "production") {
  app.use("/public", express.static(path.join(__dirname, "../../public")))

  app.get('/', (req: Request, res: Response) => {
    return res.status(200).sendFile(path.join(__dirname, "../../public/index.html"))
  })

  app.post('/fetching', dataController.getData, (req: Request, res: Response) => {
    data.push(res.locals.data) 
    return res.status(200).json(res.locals.data)
  })

  app.post('/test', testController.getSchema, (req: Request, res: Response) => {
    eval(res.locals.code)
    // console.log(typeof data)
    // expressGraphQL({
    //   schema: {},
    //   graphiql: true,
    // })
//     let sdlSchema = printSchema(Schema);
//     sdlSchema =`
//    schema {
//        query: omg
//      }
     
//     type omg {
//       message: String
//      }

// `
// const newBuiltSchema = buildSchema(sdlSchema);
// console.log(sdlSchema, newBuiltSchema)

  //   app.use("/graphql", expressGraphQL({
  //     schema: newBuiltSchema,
  //     graphiql: true,
  //   }))
  //   app.get('/test', expressPlayground({ endpoint: '/graphql' }))



    return res.status(200).json("ok")
  })


}

app.listen(3000, () => {
  console.log("Server is running")
});