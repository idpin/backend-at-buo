let express = require ("express")
let database = require("../database")

let routerAnalytics = express.Router();



routerAnalytics.get("/total", async (req,res) => {
    let articles = []
    database.connect();
    articles = await database.query("SELECT COUNT(*) FROM articles;")
    console.log(articles);

    database.disconnect();
    res.json(articles)

})

routerAnalytics.get("/rama", async (req,res) => {
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

routerAnalytics.get("/editor", async (req,res) => {
    let articles = []
    database.connect();
    articles = await database.query("SELECT editor, COUNT(*) AS cantidad FROM articles GROUP BY editor; ")
    console.log(articles);

    database.disconnect();
    res.json(articles)

})

routerAnalytics.get("/periodo", async (req,res) => {
    let articles = []
    database.connect();
    articles = await database.query("SELECT periodo, COUNT(*) AS cantidad FROM articles GROUP BY periodo; ")
    console.log(articles);

    database.disconnect();
    res.json(articles)

})





module.exports=routerAnalytics