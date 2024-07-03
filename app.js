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
let routerArticles = require("./routers/routerArticles")
let routerAnalytics = require("./routers/routerAnalytics")



app.use(["/articles"], (req, res, next) => {
    console.log("middleware excution")
    console.log(req)
    let apiKey = req.query.apiKey;
    if ( apiKey == undefined){
        return res.status(401).json({ error: "no apiKey"})
    }

    let infoInApiKey = jwt.verify(apiKey, "secret")
    if (infoInApiKey == undefined || activeApiKeys.indexOf(apiKey)== -1 ){
        return res.status(401).json({ error: "invalid apiKey"})
    }

    req.infoInApiKey = infoInApiKey;
    next();    

    
})




app.use("/journals",routerJournals)
app.use("/users", routerUsers)
app.use("/articles", routerArticles)
app.use("/analytics", routerAnalytics)


app.listen(port, () => {
    console.log("FinderApp listening on port "+port)
})


    
