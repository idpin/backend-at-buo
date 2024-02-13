const express = require("express")
const app = express();
let cors = require('cors')
app.use(express.json())
app.use(cors())

const port = 4000;

let routerJournals = require("./routers/routerJournals")


app.use("/journals",routerJournals)

app.listen(port, () => {
    console.log("FinderApp listening on port "+port)
})