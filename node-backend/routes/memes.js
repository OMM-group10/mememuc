var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  //get collections from db
  let memes = req.db.get("Memes");
  let users = req.db.get("Users");
  let comments = req.db.get("Comments");

  //find specified meme in collection
  memes.findOne({name: req.query.meme})
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

module.exports = router;