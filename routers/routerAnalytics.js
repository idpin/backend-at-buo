let express = require ("express")
let database = require("../database")

let routerAnalytics = express.Router();


routerAnalytics.get("/", async (req,res) => {
    let articles = []
    database.connect();
    articles = await database.query("SELECT ramaDepartamento, COUNT(*) AS cantidad FROM articles GROUP BY ramaDepartamento; ")
    console.log(articles);

    database.disconnect();
    res.json(articles)

})

routerAnalytics.get("/departamento", async (req,res) => {
    let articles = []
    database.connect();
    articles = await database.query("SELECT departamento, COUNT(*) AS cantidad FROM articles GROUP BY departamento; ")
    console.log(articles);

    database.disconnect();
    res.json(articles)

})





module.exports=routerAnalytics