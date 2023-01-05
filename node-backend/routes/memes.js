var express = require('express');
var router = express.Router();

/* GET meme information.
  memes/?meme='titleofmeme'
*/
router.get('/', function(req, res, next) {

  //get collections from db
  let memes = req.db.get("Memes");
  let users = req.db.get("Users");
  let comments = req.db.get("Comments");

  //find specified meme in collection
  memes.findOne({title: req.query.meme})
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
router.get('/list', function(req, res, next) {
  //get meme collection
  let memes = req.db.get("Memes");

  //find memes and return to client
  memes.find().then(docs=>res.json(docs));

});

//POST data to create a meme and save it in db
router.post('/create', async function(req, res, next) {

  //get collections
  let memes = req.db.get("Memes");
  let users = req.db.get("Users");

  let doc = req.body;

  //find creatorId
  let user = await users.findOne({username: doc.user});
  
  //create new dbDocument
  doc.creationDate = new Date();
  doc.creator = user._id;
  delete doc.user;
  doc.template = req.db.id(doc.template.$oid)

  //TODO: link meme image/render meme image

  //insert meme in db and return result
  memes.insert(doc)
  .then(result=>{
    res.json(result);
  })


  //res.json(doc);
  

});

module.exports = router;