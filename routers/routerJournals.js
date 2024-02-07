const express = require("express")
const database = require("../database")

const routerJournals = express.Router();


routerJournals.get("/:id", async (req, res) => {
    database.connect();
    
    let journals = await database.query("SELECT * FROM journals")

    database.disconnect();
    res.json(journals)
})

module.exports = routerJournals;