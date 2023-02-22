var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const db = req.db;
  const users = db.get('users');
  users.find({username: req.username},{ projection: {basicauthtoken: 0} }) // return all user properties, except the basic auth token
      .then((docs) => res.json(docs))
      .catch((e) => res.status(500).send())
});

//get memes created by query user
//TODO: error handling
router.get('/history', async (req, res, next) => {
  //get username
  let username = req.query.user;
  if(!username) return res.status(404).json("No user specified");

  //get collections
  let memes = req.db.get("Memes");
  let users = req.db.get("Users");

  //get userid from db
  let user = await users.findOne({username: username});
  //get memes created by user
  let history = await memes.find({creator: user._id});

  res.json(history);
});

//get memes created by query user
//TODO: error handling
router.get('/drafts', async (req, res, next) => {
  //get username
  let username = req.query.user;
  if(!username) return res.status(404).json("No user specified");

  //get collections
  let drafts = req.db.get("Drafts");
  let users = req.db.get("Users");

  //get userid from db
  let user = await users.findOne({username: username});
  //get memes created by user
  let userDrafts = await drafts.find({creator: user._id});

  res.json(userDrafts);
});



module.exports = router;
