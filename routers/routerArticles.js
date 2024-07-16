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




routerArticles.post("/", async (req, res) => {
    let titulo = req.body.titulo
    let doi = req.body.doi
    let doiUrl = req.body.doiUrl
    let fechaEnvio = req.body.fechaEnvio
    let fechaAceptacion = req.body.fechaAceptacion
    let idioma = req.body.idioma
    let autorLikeEditor = req.body.autorLikeEditor
    let autorLikePortal = req.body.autorLikePortal
    let departamento = req.body.departamento
    let ramaDepartamento = req.body.ramaDepartamento
    let tipologia = req.body.tipologia
    let editor = req.body.editor
    let revista = req.body.revista
    let pIssn = req.body.pIssn
    let eIssn = req.body.eIssn
    let modelOa = req.body.modelOa
    let licencia = req.body.licencia
    let fechaSolicitud = req.body.fechaSolicitud
    let fechaAprobacion = req.body.fechaAprobacion
    let diasPendiente = req.body.diasPendiente
    let precio = req.body.precio
    let idFinanciador = req.body.idFinanciador
    let financiador = req.body.financiador
    let periodo = req.body.periodo


    //validacion: cuantas más comprobaciones tengamos más robusta y segura será nuestra app
    if (isNaN(periodo) ){
        return res.status(400).json({ error: "periodo no es un número"})
    }
    if (isNaN(pIssn) ){
        return res.status(400).json({ error: "issn no es un número"})
    }
    

    database.connect();

    try {
    let insertedArticle = await database.query(
        "INSERT INTO articles (titulo, doi, doiUrl, fechaEnvio, fechaAceptacion, idioma, autorLikeEditor, autorLikePortal, departamento, ramaDepartamento, tipologia, editor, revista, pIssn, eIssn, modelOa, licencia, fechaSolicitud, fechaAprobacion, diasPendiente, precio, idFinanciador, financiador, periodo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [titulo, doi, doiUrl, fechaEnvio, fechaAceptacion, idioma, autorLikeEditor, autorLikePortal, departamento, ramaDepartamento, tipologia, editor, revista, pIssn, eIssn, modelOa, licencia, fechaSolicitud, fechaAprobacion, diasPendiente, precio, idFinanciador, financiador, periodo])
    } catch (e){
        database.disconnect();
        return res.status(400).json({ error: "Error al rellenar el formulario con los datos del artículo aprobado"})
    }



})

routerArticles.put("/:id", async (req,res) => {
    let id = req.params.id
    let titulo = req.body.titulo
    let doi = req.body.doi
    let doiUrl = req.body.doiUrl
    let idioma = req.body.idioma
    let fechaEnvio = req.body.fechaEnvio
    let fechaAceptacion = req.body.fechaAceptacion
    let autorLikeEditor = req.body.autorLikeEditor
    let autorLikePortal = req.body.autorLikePortal
    let departamento = req.body.departamento
    let ramaDepartamento = req.body.ramaDepartamento
    let tipologia = req.body.tipologia
    let editor = req.body.editor
    let revista = req.body.revista
    let pIssn = req.body.pIssn
    let eIssn = req.body.eIssn
    let modelOa = req.body.modelOa
    let licencia = req.body.licencia
    let fechaSolicitud = req.body.echaSolicitud
    let fechaAprobacion = req.body.fechaAprobacion
    let diasPendiente = req.body.iasPendiente
    let precio = req.body.precio
    let idFinanciador = req.body.idFinanciador
    let financiador = req.body.financiador
    let periodo = req.body.periodo

    //validar

    database.connect();

    let updatedArticle;
    try {
        updatedArticle = await database.query(
        "UPDATE articles SET titulo = ?, doi = ?, doiUrl = ?, idioma = ?, fechaEnvio = ?, fechaAceptacion = ?, autorLikeEditor = ?, autorLikePortal = ?, departamento = ?, ramaDepartamento = ?, tipologia = ?, editor = ?, revista = ?, pIssn = ?, eIssn = ?, modelOa = ?, licencia = ?, fechaSolicitud = ?, fechaAprobacion = ?, diasPendiente = ?, precio = ?, idFinanciador = ?, financiador = ?, periodo = ? WHERE id = ?",
        [titulo,doi,doiUrl,idioma,fechaEnvio,fechaAceptacion,autorLikeEditor,autorLikePortal,departamento,ramaDepartamento,tipologia,editor,revista,pIssn,eIssn,modelOa,licencia,fechaSolicitud,fechaAprobacion,diasPendiente,precio,idFinanciador,financiador,periodo,id])

    } catch (e) {
        database.disconnect();
        return res.status(400).json ({ error: "error in update articles"})
    }
    database.disconnect();
    res.json({modified: updatedArticle})
})


routerArticles.delete("/:id", async (req, res) => {
    console.log("estoy aqui")
    let id = req.params.id
    console.log (id)
    if ( id == undefined){
        return res.status(400).json({error : "no id params"})

    }

    database.connect();
    try {
        await database.query("DELETE FROM articles WHERE id = ?", [id])
    } catch ( e ){
        database.disconnect();
        return res.status(400).json({ error : "no in delete article"})
    }
    database.disconnect();
    console.log (id)
    res.json({ deleted: true })

} )


module.exports=routerArticles