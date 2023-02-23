var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

//login with username and password, responds with jwt token
router.post('/login', async (req, res, next) => {
  //get info from request
  const username = req.body.username;
  const password = req.body.password;

  //get Users Collection
  const users = req.db.get("Users");
  //get userid from db
  let user = await users.findOne({username: username});
  if(!user) return res.status(400).json("User not found");

  if(password==user.password){
  //create token and respond
  const token = jwt.sign({user:username}, process.env.SERVERKEY);
  res.json({token: token});
  }
  else{
    res.status(401).json("Wrong user or Password");
  }
});

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
  let username = req.username;
  if(!username) return res.status(404).json("No user specified");

  //get collections
  let memes = req.db.get("Memes");
  let users = req.db.get("Users");

  //get userid from db
  let user = await users.findOne({username: username});
  if(user){
  //get memes created by user
  let history = await memes.find({creator: user._id});
  res.json(history);
  }
  else res.json([]);
});

//get memes created by query user
//TODO: error handling
router.get('/drafts', async (req, res, next) => {

  //get username
  let username = req.username;
  if(!username) return res.status(404).json("No user specified");

  //get collections
  let drafts = req.db.get("Drafts");
  let users = req.db.get("Users");

  //get userid from db
  let user = await users.findOne({username: username});
  if(user){
  //get drafts created by user
  let userDrafts = await drafts.find({creator: user._id});
  res.json(userDrafts);
  }
  //user not authenticated
  else{
    res.json([]);
  }
});



module.exports = router;
