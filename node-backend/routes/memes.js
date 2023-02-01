var express = require('express');
var router = express.Router();
var renderer = require('../renderer');

//number of memes per API Call to list
const PAGESIZE = 10;

/* GET meme information.
  memes/?meme='memeId'
*/
//TODO: Error handling
router.get('/', function(req, res, next) {

  //get collections from db
  let memes = req.db.get("Memes");
  let users = req.db.get("Users");
  let comments = req.db.get("Comments");

  //cast Object Id
  let memeId = req.db.id(req.query.meme);

  //find specified meme in collection
  memes.findOne({_id: memeId})
    .then(meme => {

      //find creator
      users.findOne({_id: meme.creator})
        .then(user =>{

          //add creator data to meme
          meme.creator = user;

          //find comments
          comments.find({meme: meme._id})
            .then(comments=>{

              //add comments to meme data
              meme.comments = comments;

              //return meme data
              res.json(meme);

            })
        })
    })
    //TODO: add error handling
    //TODO: Clean up layout


  

  /* res.render('index', { title: 'Express' }) */
});


/* GET a list of all memes
  /memes/list
*/
//TODO: add functionality for filters/queries
router.get('/list', function(req, res, next) {

  //create query

  let options = {
    limit: PAGESIZE,
    sort: {title: 1}
  }

  //if page number is specified skip earlier entries
  let queryOptions = JSON.parse(req.query.options);
  if(queryOptions.page) options.skip = queryOptions.page * PAGESIZE;
  if (queryOptions.sort) options.sort = queryOptions.sort;

  console.log(queryOptions);
  

  //get meme collection
  let memes = req.db.get("Memes");

  //find memes and return to client
  memes.find({},options).then(docs=>res.json(docs));

});



//POST data to create a meme and save it in db
router.post('/test', async function(req, res, next) {

  //get collections
  let memes = req.db.get("Memes");
  let users = req.db.get("Users");
  let templates = req.db.get("Templates");

  let doc = req.body;

  console.log(doc);

  //find creatorId
  let user = await users.findOne({username: doc.user});
  
  //create new dbDocument
  doc.creationDate = new Date();
  doc.creator = user._id;
  delete doc.user;
  //cast into id
  doc.template = req.db.id(doc.template);
  console.log("cast Id" + doc.template);
  doc.image = "addurllater";
  doc.rating = 0;
  doc.comments = [];


  //TODO: link meme image/render meme image

  //insert meme in db and return result
  memes.insert(doc)
  .then(result=>{
    res.json(result);
  })


  //res.json(doc);
  

});


//test stuff
router.get('/test', function(req, res, next) {
renderer.render();
res.send("Hello");

});

//TODO: Error handling
router.post('/create', async function(req, res, next) {

  //get collections
  let memes = req.db.get("Memes");
  let users = req.db.get("Users");
  let templates = req.db.get("Templates");

  let doc = req.body;

  console.log(doc);

  //find creatorId
  let user = await users.findOne({username: doc.user});
  if(user == null){ doc.creator = "anonymous"}
  else{ doc.creator = user._id;};
  delete doc.user;


  //get template
  let templateObject = await templates.findOne({name: doc.template});
  if(templateObject == null){
    //template not found
    res.status(404).send("Template not found");
    return;
  }
  console.log("Template await: " + templateObject.url);
  
  
  //create new dbDocument
  doc.creationDate = new Date();
  doc.image = "";
  doc.rating = 0;
  doc.comments = [];



  //TODO: link meme image/render meme image
  let dbObject

  //insert meme in db and return result
  try{
    dbObject = await memes.insert(doc);
  }
  catch(err){
    console.error(err);
    res.status(500).send("Error while creating entry in Database")
    return;
  }


  let imageFile;
  //render image
  try{
    imageFile = await renderer.render(templateObject.url, doc.captions, doc._id);
    }
  catch(err){
    //Error while rendering
    memes.remove({_id: dbObject._id}).catch();
    res.status(500).json({text: "Error while rendering Meme: " + err});
    return;

    }

    //update image attribute of meme dbObject with filepath
    try{
      await memes.update({_id: dbObject._id},{$set: {image: "http://localhost:3001/images/usercontent/" + imageFile}});
    }
    catch(err){
      console.error(err);
      res.status(500).send("Error while updating URL in Database")
      return;
    }

    dbObject.image = "http://localhost:3001/images/usercontent/" + imageFile;

    //return 
    console.log(dbObject);
    res.json(dbObject);

  //res.json(doc);
  

});



module.exports = router;