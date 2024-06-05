const express = require("express")
const database = require("../database")

const jwt = require("jsonwebtoken")
const routerUsers = express.Router();


let activeApiKeys = require("../activeApiKeys")



routerUsers.post("/login", async (req,res) => {
    let email = req.body.email;
    let password = req.body.password

    let errors = []
    if ( email == undefined){
        errors.push("no email in body")
    }
    if ( password == undefined){
        errors.push("no password in body")
    }
    if ( errors.length > 0){
        return res.status(400).json({ error: errors })
    }

    database.connect();
    try {

        let selectedUsers = await database.query(
            "SELECT id, email FROM users WHERE email = ? AND password = ? ",
            [email, password])
           
        database.disconnect();

        if ( selectedUsers.length == 0){
            return res.status(401).json({ error: "invadil email or password" })
        }

        let apikey = jwt.sign({
            email: email,
            id: selectedUsers[0].id,
            time: Date.now()
        }, "secret")

        activeApiKeys.push(apikey)

        res.json({
            apikey: apikey,
            id: selectedUsers[0].id,
            email: selectedUsers[0].email,
        })

    } catch ( e ){
        database.disconnect();
        return res.status(400).json({ error: "error in login" })
    }
    
})


routerUsers.post("/", async (req,res) => {
    let email = req.body.email
    let password = req.body.password

    let errors = [];

    if ( email == undefined){
        errors.push({ error: "no email in body"})
    }
    
    if ( password == undefined){
        errors.push({ error: "no password in body"})
    }

    if ( errors.length > 0){
        return res.status(400).json({ error: errors })
    }

    database.connect();

    let insertedUser;

    try {
        let usersWithEmail = await database.query(
            "SELECT email FROM users WHERE email = ?",
            [email])

        if ( usersWithEmail.length > 0 ){
            database.disconnect();
             return res.status(400).json({ error: "email Already used" })
        }

        insertedUser = await database.query(
            "INSERT INTO users (email, password) VALUES (?,?)",
            [email, password])
        // aquí se podrían hacer más validaciones: de longitud, de estructura: si el correo tiene @, etc. Incluso podemos restringir el post solo a correos uniovi.es; o sea que si alguien no es uniovi no dejarle instert<r (hacer post) en nuestra base de datos.
        // Preguntar a porte cuestiones de seguridad relativas a inyección sql
    } catch ( e ){
        database.disconnect();
        return res.status(400).json({ error: "problem in insert user" })
    }

    database.disconnect();
    res.json({inserted: insertedUser})
})

routerUsers.get("/disconect", async (req, res) => {
    let apikey = req.query.apikey

    let index = activeApiKey.indexOf(apikey)
    if (index != -1){
        activeApiKeys.splice(index,1)
        res.json({ disconected : true })
    } else {
        res.status(400).json({ error: "usuario no encontrado"})
    }
})

routerUsers.get("/checkLogin", async (req, res) => {
    return res.status(400).json({message: "ok"})
})

module.exports = routerUsers
