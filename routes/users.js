var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/aaa',function(req,res,next){
  res.send("wo shi aaa");
});
module.exports = router;
