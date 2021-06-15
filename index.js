const express = require('express');
var bodyParser = require('body-parser');
 var ejs = require('ejs');
var db=require('./database');
const app = express();
const port = 3000;
var search = "";

var urlencodedParser = bodyParser.urlencoded({extended: false})
app.set('view engine', "ejs");

// Rendering form
app.get('/form', function (req,res) {res.render('form',{message: false});});

//Getting all items from db 
app.get('/all', function (req,res) {
  var sql = 'SELECT * FROM artist';
  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err)
    }
    else{
      //console.log(data)
      // display data
      res.render('all_artist', {results : data})
     }
    })

});

//Search by Name
app.get('/name', function (req,res) {
  var search_name = search
  console.log(search_name)
  var sql = 'SELECT * FROM artist WHERE name LIKE "%' + search_name + '%"';
  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err)
    }
    else if (data == ""){
      res.render('search', {message: 'No records found of ' + search_name + ' try another name'} );
    }
    else{
      res.render('all_artist', {results : data})
       }
    })

});

//Search by province
app.get('/province', function (req,res) {
  var search_province = search
  var sql = 'SELECT * FROM artist WHERE province LIKE "%' + search_province + '%"';
  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err)
    }
    else if (data == ""){
      res.render('search', {message: 'No records found of ' + search_province + ' try another province'} );
    }
    else{
      res.render('all_artist', {results : data})
       }
    })

});

//Search by genre
app.get('/genre', function (req,res) {
  var search_genre = search
  var sql = 'SELECT * FROM artist WHERE genre LIKE "%' + search_genre + '%"';
  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err)
    }
    else if (data == ""){
      res.render('search', {message: 'No records found of ' + search_genre + ' try another genre'} );
    }
    else{
      res.render('all_artist', {results : data})
       }
    })

});

//Home which is search page
app.get('/', function(req, res){
  res.render("search", {message : false})
}),

//Retriving info from form
app.post('/newartist',urlencodedParser, function(req, res){
  var name = req.body.name;
  var surname = req.body.surname;
  var genre = req.body.genre;
  var province = req.body.province;
  var contact = req.body.contact;
 // console.log(name+ surname+ genre+ province+ contact);

 var sql = 'INSERT INTO artist(name, surname, genre, province, contact) Values(?, ?, ?, ?, ?)';
db.query(sql, [name, surname, genre, province, contact], function(err, data){
  if (err){
    res.render('form', {message : err})
  }
  else{
   res.render('form', {message: 'You have succesfull entered data to database'} );
   }
  })
 })

 // Retriving from form
 app.post('/search',urlencodedParser, function(req, res){
    var search_term = req.body.search
    var value = req.body.searchradio
    search = search_term
    if(value == "Name"){res.redirect("/name")}
    if(value == "Province"){res.redirect("/province")}
    if(value == "Genre"){res.redirect("/Genre")}
 });

 

//Start Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });