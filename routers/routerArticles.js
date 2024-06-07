let express = require ("express")
let database = require("../database")

let routerArticles = express.Router();

routerArticles.get("/", async (req,res) => {
    let articles = []
    database.connect();
    articles = await database.query("SELECT * FROM articles")
    

    database.disconnect();
    res.json(articles)

})


routerArticles.post("/", async (req,res) => {
    let titulo = req.body.titulo
    let doi = req.body.doi
    let doiUrl = req.body.doiUrl
    let fechaAceptacion = req.body.fechaAceptacion
    let autor = req.body.autor
    let departamento = req.body.departamento
    let facultad = req.body.facultad
    let tipologia = req.body.tipologia
    let editor = req.body.editor
    let revista = req.body.revista
    let issn = req.body.issn
    let eIssn = req.body.eIssn
    let modelOa = req.body.modelOa
    let fechaSolicitud = req.body.fechaSolicitud
    let fechaAprobacion = req.body.fechaAprobacion
    let diasPendientes = req.body.diasPendientes
    let precio = req.body.precio
    let financiador = req.body.financiador
    let idFinanciador = req.body.idFinanciador
    let periodo = req.body.periodo


    //validacion: cuantas más comprobaciones tengamos más robusta y segura será nuestra app
    if (isNaN(periodo) ){
        return res.status(400).json({ error: "periodo no es un número"})
    }
    if (isNaN(issn) ){
        return res.status(400).json({ error: "issn no es un número"})
    }
    

    database.connect();

    try {
    let insertedArticle = await database.query(
        "INSERT INTO articles (titulo, doi, doiUrl, fechaAceptacion, autor, departamento, facultad, tipologia, editor, revista, issn, eIssn, modelOa, fechaSolicitud, fechaAprobacion, diasPendientes, precio, financiador, idFinanciador, periodo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [titulo, doi, doiUrl, fechaAceptacion, autor, departamento, facultad, tipologia, editor, revista, issn, eIssn, modelOa, fechaSolicitud, fechaAprobacion, diasPendientes, precio, financiador, idFinanciador, periodo])
    } catch (e){
        database.disconnect();
        return res.status(400).json({ error: "Error al rellenar el formulario con los datos del artículo aprobado"})
    }

})

module.exports=routerArticles