import express from 'express';
import path from 'path';

const app = express();
app.use(express.json());



if (process.env.NODE_ENV === "production"){
    app.use("/", express.static(path.join(__dirname, "../../public")))

    app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, "../../public/index.html"))
    })
}

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../index.html"));
//   });

app.listen(3000, () => {
    console.log("Server is running")
})