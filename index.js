var path = require('path');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
const express = require('express');
var bodyParser = require('body-parser');
 var ejs = require('ejs');
var db=require('./database');

const app = express();
const port = 3000;

var search = "";

app.use('/public', express.static('public'));
var urlencodedParser = bodyParser.urlencoded({extended: false})
app.set('view engine', "ejs");
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 app.use(expressValidator());
 
//end

 
//display login page
app.get('/login', function(req, res){    
    // render to views/user/add.ejs
    res.render('login', {
        title: 'Login',
        email: '',
        password: '' , 
        message: false
    })
})
 
 
//authenticate user
app.post('/login', function(req, res) {
       
    var email = req.body.email;
    var password = req.body.password;
 
        db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
            if(err) throw err
             
            // if user not found
            if (rows.length <= 0) {
            res.redirect('/login')
            }
            else { // if user found
                
                req.session.loggedin = true;
                //req.session
                res.redirect('/');
 
            }            
        })
  
})
 
 
// Logout user
app.get('/', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});


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
  
  //SELECT * FROM artist WHERE  surname LIKE "ndlovu" or name like "ndlovu"
  var sql = 'SELECT * FROM artist WHERE stagename LIKE "%' + search_name + '%"' + 'OR name LIKE "%' + search_name + '%"' ;
  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err)
    }
    else if (data == ""){
      res.render('search', {message: 'No records found of ' + search_name + ' try another name',  form : false} );
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
      res.render('search', {message: 'No records found of ' + search_province + ' try another province',  form : false } );
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
      res.render('search', {message: 'No records found of ' + search_genre + ' try another genre', form : false} );
    }
    else{
      res.render('all_artist', {results : data})
       }
    })

});

//Home which is search page
app.get('/', function(req, res){
  if (req.session.loggedin){
    res.render("search", {message : false, form : true })
  }
else {res.render("search", {message : false, form : false})}
}),

//delete
app.get('/delete/:id', function(req, res){
  var id = req.params['id']
  var sql = 'DELETE FROM artist WHERE id = ' + id;

  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err)
    }
    else {
    res.redirect("/")
    }

})})

//Edit
app.get('/edit', function(req, res){
  res.render('formedit', {message : false});
})

//Retriving info from form
app.post('/newartist',urlencodedParser, function(req, res){
  var name = req.body.name;
  var surname = req.body.surname;
  var genre = req.body.genre;
  var province = req.body.province;
  var address = req.body.address;
  var email = req.body.email;
  var phone = req.body.phone;
  var stagename = req.body.stagename;
  var namefull = name + " " + surname;
 // console.log(name+ surname+ genre+ province+ contact);

 var sql = 'INSERT INTO artist(name, email, genre, province, address,  phonenumber, stagename) Values(?, ?, ?, ?, ?, ?, ?)';
db.query(sql, [namefull, email, genre, province, address,  phone, stagename], function(err, data){
  if (err){
    res.render('form', {message : err})
  }
  else{
   res.render('form', {message: 'You have succesfull entered data to database'} );
   }
  })
 })

 // Retriving from search
 app.post('/search',urlencodedParser, function(req, res){
    var search_term = req.body.search
    var value = req.body.searchradio
    search = search_term
    if(value == "Name"){res.redirect("/name")}
    if(value == "Province"){res.redirect("/province")}
    if(value == "Genre"){res.redirect("/Genre")}
 });

app.get('/details/:id', function(req, res){
 var id = req.params['id']
  var sql = "SELECT * FROM artist WHERE id = " + id
  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err)
    }
    else{
      if (req.session.loggedin){
        res.render("details", {results : data, form : true })
      }
   else{ res.render('details', {results : data, form: false})}
     }
    })
  
}) 

 app.get("/test", function(req, res){
  res.json({
    "fruit": "Apple",
    "size": "Large",
    "color": "Red"
})
})
//Start Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
