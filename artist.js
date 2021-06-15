var express = require('express');
var router = express.Router();
var app = express()
var db=require('./database');
app.get('/', function (req,res) {res.send('testing');});
 
  // insert user data into users table
  var sql = 'INSERT INTO artist SET ?';
  db.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
         console.log("User dat is inserted successfully "); 
  });

module.exports = router;