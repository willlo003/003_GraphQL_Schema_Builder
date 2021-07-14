import express, {Application, Request, Response, NextFunction} from 'express';
import path from 'path';


const app: Application = express();
const cors = require("cors");

app.use(express.json());
app.use(
    cors({
      origin: ["http://localhost:8080", "http://localhost:3000"],
      credentials: true,
    })
  );



if (process.env.NODE_ENV === "production"){
    app.use("/", express.static(path.join(__dirname, "../../public")))

    app.get('/', (req: Request, res: Response) => {
     res.sendFile(path.join(__dirname, "../../public/index.html"))
    })
}

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../index.html"));
//   });

app.listen(3000, () => {
    console.log("Server is running")
})