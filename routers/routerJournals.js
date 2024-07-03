const express = require("express")
const database = require("../database")

const routerJournals = express.Router();

/*routerJournals.get("/", async (req,res) => {
    database.connect();
    const journals = await database.query("SELECT * FROM journals")
    database.disconnect();
    res.json(journals)
})
*/
routerJournals.get("/", async (req, res) => {
    console.log(req.query);
    database.connect();
    let journals =[];
    console.log(req.query.search);
    console.log(req.query.field);
    let query = 'SELECT * FROM journals WHERE ';
    let bindingParams = [];
    if( req.query.search != undefined && req.query.search != '' ){
         query += "(issn like ? or title like ?)";
         bindingParams.push(['%'+req.query.search+'%'],['%'+req.query.search+'%']);
    }

    if( req.query.medida != undefined && req.query.medida != '' ){
        let medida = req.query.medida.split(",")
        console.log(medida)
        if(bindingParams.length > 0){
            query += " and sjrq in ?";
        }else{
            query += "sjrq in ? ";
        }
        bindingParams.push([medida]);
    }
   
   
    if( req.query.cuartil != undefined && req.query.cuartil != '' ){
        let cuartil = req.query.cuartil.split(",")
        console.log(cuartil)
        if(bindingParams.length > 0){
            query += " and jcrq in ?";
        }else{
            query += "jcrq in ? ";
        }
        bindingParams.push([cuartil]);
    }

    


    if( req.query.publisher != undefined && req.query.publisher != '' ){
        let publisher = req.query.publisher.split(",")
        console.log(publisher)
        if(bindingParams.length > 0){
            query += " and publisher in ?";
        }else{
            query += "publisher in ? ";
        }
        bindingParams.push([publisher]);
    }

   
    

    if( req.query.field != undefined && req.query.field != '' ){
        if(bindingParams.length > 0){
            query += "and field = ?";
        }else{
            query += "field = ?";
        }
        bindingParams.push([req.query.field]);
    }

    // if( req.query.publisher != undefined && req.query.publisher != '' ){
      //  if(bindingParams.length > 0){
          //  query += "and publisher = ?";
     ///   }else{
          //  query += "publisher = ?";
     //   }
      //  bindingParams.push([req.query.publisher]);

  //  } Si quito todo esto hago algún cambio en la recuperación principal???? PORTE


         if( req.query.jcrq != undefined && req.query.jcrq != '' ){
             if(bindingParams.length > 0){
                query += "and jcrq = ?";
             }else{
                query += "jcrq = ?";
             }
             bindingParams.push([req.query.jcrq]);
        }



        if( req.query.sjrq != undefined && req.query.sjrq != '' ){
            if(bindingParams.length > 0){
                query += "and sjrq = ?";
            }else{
                query += "sjrq = ?";
            }
            bindingParams.push([req.query.sjrq]);
        }





    
    if(bindingParams.length == 0){
        query = "SELECT * FROM journals";
    }
    console.log(query);
    console.log(bindingParams);
    journals = await database.query(query, bindingParams);

    /*
    if(){
        journals = await database.query("SELECT * FROM journals");
    }*/
    database.disconnect();
    res.json(journals)
    //pasar un query.param (clave), hacer una búsqueda por todas las columnas de la tabla con un like (clave) devolviendo un array de journals
});

routerJournals.get("/fields", async (req, res) => {
    console.log(req.query);
    database.connect();
    let fields =[];
    fields = await database.query("SELECT distinct field as value, field as label FROM journals");

    database.disconnect();
    res.json(fields)
    
    //TODO: Pendiente llamar a esta peticion para poblar el select del React
});


routerJournals.get("/publishers", async (req, res) => {
    console.log(req.query);
    database.connect();
    let publishers =[];
    publishers = await database.query("SELECT distinct publisher as value, publisher as label FROM journals");

    database.disconnect();
    res.json(publishers)
    
    //TODO: Pendiente llamar a esta peticion para poblar el select del React
});


routerJournals.get("/cuartiles", async (req, res) => {
    console.log(req.query);
    database.connect();
    let cuartiles =[];
    cuartiles = await database.query("SELECT distinct jcrq as value, cuartiles as label FROM journals");

    database.disconnect();
    res.json(cuartiles)

});


routerJournals.get("/medida", async (req, res) => {
    console.log(req.query);
    database.connect();
    let medida =[];
    medida = await database.query("SELECT distinct sjrq as value, medida as label FROM journals");
    
    database.disconnect();
    res.json(medida)

    
    
    
    //TODO: Pendiente llamar a esta peticion para poblar el select del React
});

routerJournals.get("/:issn", async (req, res) => { 
    res.set('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let issn = req.params.issn;
    if ( issn == undefined){
        return res.status(400).json({ error : "no issn param"})
    }
    database.connect();

    let journals = await database.query("SELECT * FROM journals WHERE issn = ? ", [issn])
    if ( journals.length < 1){
        database.disconnect();
        return res.status(404).json({ error : "Revista no participante o ISSN incorrecto"})
    } else {
        database.disconnect();
        return res.json(journals)
    }
    
    database.disconnect();
    res.json(journals)
})



module.exports = routerJournals;