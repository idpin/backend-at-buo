const express = require("express")
const app = express();
app.use(express.json())
const jwt = require("jsonwebtoken");
let activeApiKeys = require("./activeApiKeys")
const cors = require("cors");

const port = 4000;
app.use(cors())

let routerJournals = require("./routers/routerJournals")
let routerUsers = require("./routers/routerUsers")


app.use("/journals",routerJournals)
app.use("/users", routerUsers)

app.listen(port, () => {
    console.log("FinderApp listening on port "+port)

    //falta aquí let apikey
})