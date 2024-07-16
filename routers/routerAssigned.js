let express = require ("express")
let database = require("../database")

let routerAssigned = express.Router();

routerAssigned.get("/", async (req,res) => {
    let assigned = []
    database.connect();
    assigned = await database.query("SELECT * FROM assigned")
    

    database.disconnect();
    res.json(assigned)

})

routerAssigned.get("/asignados", async (req,res) => {
    let assigned = []
    database.connect();
    assigned = await database.query("SELECT asignados, COUNT(*) AS cantidad FROM assigned GROUP BY editor; ")
    console.log(assigned);

    database.disconnect();
    res.json(assigned)

})



module.exports=routerAssigned