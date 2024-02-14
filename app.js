const express = require("express")
const app = express();
app.use(express.json())

const cors = require("cors");

const port = 4000;
app.use(cors())

let routerJournals = require("./routers/routerJournals")


app.use("/journals",routerJournals)

app.listen(port, () => {
    console.log("FinderApp listening on port "+port)
})