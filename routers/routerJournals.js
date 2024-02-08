const express = require("express")
const database = require("../database")

const routerJournals = express.Router();


routerJournals.get("/", async (req,res) => {
    console.log(req.query);
    database.connect();

    let journals = await database.query("SELECT * FROM journals WHERE issn like ? or title like ?", ['%'+req.query.search+'%','%'+req.query.search+'%'])

    database.disconnect();
    res.json(journals)
})


routerJournals.get("/:issn", async (req, res) => {
    let issn = req.params.issn;
    if ( issn == undefined){
        return res.status(400).json({ error : "no issn param"})
    }
    database.connect();

    let journals = await database.query("SELECT * FROM journals WHERE issn = ?", [issn])
    if ( journals.length < 1){
        database.disconnect();
        return res.status(400).json({ error : "no journals with this issn"})
    } else {
        database.disconnect();
        return res.json(journals[0])
    }
    
    database.disconnect();
    res.json(journals)
})

routerJournals.get("/:title", async (req, res) => {
    let title = req.params.title;
    if ( title == undefined){
        return res.status(400).json({ error : "no title param"})
    }
    database.connect();

    let journals = await database.query("SELECT * FROM journals WHERE title = ?", [title])
    if ( journals.length < 1){
        database.disconnect();
        return res.status(400).json({ error : "no journals with this title"})
    } else {
        database.disconnect();
        return res.json(journals[0])
    }
    
    database.disconnect();
    res.json(journals)
})

module.exports = routerJournals;