var express = require('express');
var router = express.Router();



/* GET template information.
    Query:
    ?template='templatename' */
router.get('/', function(req, res, next) {
  const db = req.db;
  
  // get collections from db
  const templates = db.get('Templates');

  templates.findOne({name: req.query.template}) 
      .then((template) => res.json(template))
      .catch((e) => res.status(500).send())
});

/* GET all memes created with template specified in query. */
router.get('/memes', function(req, res, next) {
    const db = req.db;
    
    // get collections from db
    const templates = db.get('Templates');
    const memes = db.get("Memes");
  
    templates.findOne({name: req.query.template}) //Find template
            .then(template => {
                memes.find({template: template._id}) //Find associated memes
                .then(memeList=>{
                    res.json(memeList);
                })
            })
        .catch((e) => res.status(500).send())
  });
  

module.exports = router;
