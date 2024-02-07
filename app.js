const express = require("express")
const app = express();
app.use(express.json())

const port = 3000;

let routerJournals = require("./routers/routerJournals")


app.use("/journals",routerJournals)

app.listen(port, () => {
    console.log("FinderApp listening on port "+port)
})