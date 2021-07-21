var logger = require('morgan');
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
            res.render('login', {loggedout : true})
           }
            else { // if user found
                
                req.session.loggedin = true;
                //req.session
                res.render("search", {message : false, form : true, login: true});
 
            }            
        })
  
})
 
 
// Logout user
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});


// Rendering form
app.get('/form', function (req,res) {
  if (req.session.loggedin){
    res.render('form',{message: false, form: true});
  }

  else {res.render("search", {message : "Please login in first", form : false, login: false})}

});

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
      res.render('all_artist', {results : data, form : true, number : data.length})
     }
    })

});

//Search by Name
app.get('/name', function (req,res) {
  var search_name = search
  
  
  //SELECT * FROM artist WHERE  surname LIKE "ndlovu" or name like "ndlovu"
var sql = 'SELECT * FROM artist WHERE stagename LIKE "%' + search_name + '%"' + 'OR name LIKE "%' + search_name + '%"' ;
  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err)
    }
    else if (data == ""){
      if (req.session.loggedin){
        res.render('search', {message: 'No records found of ' + search_name + ' try another name',  form : true, login: false});
      }
      else{
      res.render('search', {message: 'No records found of ' + search_name + ' try another name',  form : false, login: false} );
      }
    }
    else{
      if (req.session.loggedin){
        res.render('all_artist', {results : data, form: true,  number : data.length})
      }
      else {
        res.render('all_artist', {results : data, form: false,  number : data.length})
      }
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

      if (req.session.loggedin){
        res.render('search', {message: 'No records found of ' + search_province + ' try another name',  form : true, login: false});
      }
      else{
      res.render('search', {message: 'No records found of ' + search_province + ' try another name',  form : false, login: false} );
      }
    }
    else{
      if (req.session.loggedin){
        res.render('all_artist', {results : data, form: true,  number : data.length})
      }
      else {
        res.render('all_artist', {results : data, form: false,  number : data.length})
      }
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
      if (req.session.loggedin){
        res.render('search', {message: 'No records found of ' + search_genre + ' try another name',  form : true, login: false});
      }
      else{
      res.render('search', {message: 'No records found of ' + search_genre + ' try another name',  form : false, login: false} );
      
      }
    }
    else{
      if (req.session.loggedin){
        res.render('all_artist', {results : data, form: true, number : data.length})
        
      }
      else {
        res.render('all_artist', {results : data, form: false,  number : data.length})
       
      }
       }
    })

});

//Home which is search page
app.get('/', function(req, res){
  if (req.session.loggedin){
    res.render("search", {message : false, form : true, login: false})
  }
else {res.render("search", {message : false, form : false, login: false})}
}),

//delete
app.get('/delete/:id', function(req, res){
  if (req.session.loggedin){
  var id = req.params['id']
  var sql = 'DELETE FROM artist WHERE id = ' + id;

  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err)
    }
    else {
    res.redirect("/")
    }
  
})}


})

//Edit
app.get('/edit', function(req, res){
  if (req.session.loggedin){
    res.render('formedit',{message: false, form: true});
  }

  else {res.render("search", {message : "Please login in first", form : false, login: false})}

});


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
  var category = req.body.category;
  var language = req.body.language
  var twitter = req.body.twitter
  var facebook = req.body.facebook
  var instagram = req.body.instagram
  var app = req.body.app
 console.log(name+ surname+ genre+" "+ province+ " "+ address + " "  + email + " " + phone + " "  + stagename + namefull);

 var sql = 'INSERT INTO artist(name, email, genre, province, address, phonenumber, stagename, category, language, twitter, facebook, instagram, app) Values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
db.query(sql, [namefull, email, genre, province, address, phone, stagename, category, language, twitter, facebook, instagram, app], function(err, data){
  if (err){
    res.render('form', {message : err, form : true})
  }
  else{
   res.render('form', {message: 'You have succesfull entered data to database', form: true} );
   }
  })
 })

 // Retriving from search
 app.post('/search',urlencodedParser, function(req, res){
    var search_term = req.body.search;
    var value = req.body.searchradio;
    search = search_term;
    if(value == "Name"){res.redirect("/name")}
    if(value == "Province"){res.redirect("/province");}
    if(value == "Genre"){res.redirect("/Genre");}
 });

app.get('/details/:id', function(req, res){
 var id = req.params['id'];
  var sql = "SELECT * FROM artist WHERE id = " + id;
  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err);
    }
    else{
      if (req.session.loggedin){
        res.render("details", {results : data, form : true });
      }
   else{ res.render('details', {results : data, form: false});}
     }
    });
  
});

 app.get("/test", function(req, res){
  res.json({
    "fruit": "Apple",
    "size": "Large",
    "color": "Red"
});
});

app.post("/edit/:id", function(req, res){
  var id = req.params.id;
  console.log(id);
  var name = req.body.name;
  var surname = req.body.surname;
  var genre = req.body.genre;
  var province = req.body.province;
  var address = req.body.address;
  var email = req.body.email;
  var phone = req.body.phone;
  var stagename = req.body.stagename;
  var namefull = name + " " + surname;
  var category = req.body.category;
  var language = req.body.language;
  var twitter = req.body.twitter;
  var facebook = req.body.facebook;
  var instagram = req.body.instagram;
 
  var sql = "UPDATE artist SET name = ?, email = ?, genre = ?, province = ?, address = ?, phonenumber = ?, stagename = ?, category = ?, language = ?, twitter = ?, facebook = ?, instagram = ? WHERE id = ?;";

  db.query(sql, [namefull, email, genre, province, address, phone, stagename, category, language, twitter, facebook, instagram, id], function(err, data){
    if (err){
      res.render('form', {message : err, form : true});
    }
    else{
     res.redirect("/details/" + id) ;
     }
    });
});

//start of org


//Retriving organasation info from form

app.post('/neworg',urlencodedParser, function(req, res){
  var companyname = req.body.companyname;
  var name = req.body.name;
  var surname = req.body.surname;
  var website= req.body.website;
  var province = req.body.province;
  var address = req.body.address;
  var email = req.body.email;
  var phone = req.body.phone;
  var namefull = name + " " + surname;
  var category = req.body.category;
  var twitter = req.body.twitter;
  var facebook = req.body.facebook;
  var instagram = req.body.instagram;
 
var sql = 'INSERT INTO organasation(companyname, orgname, orgphonenumber, orgemail, orgprovince, orgcategory, orgaddress, website, orgtwitter, orgfacebook, orginstagram) Values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
db.query(sql, [companyname, namefull, phone, email, province, category, address, website, twitter, facebook, instagram], function(err, data){
  if (err){
    res.render('form', {message : err, form : true});
  }
  else{
   res.render('form', {message: 'You have succesfull entered data to database', form: true} );
   }
  });
 });

// Retriving from search
app.post('/orgsearch',urlencodedParser, function(req, res){
  var search_term = req.body.search;
  var value = req.body.searchradio;
  search = search_term;
  if(value == "Name"){res.redirect("/orgname");}
  if(value == "Province"){res.redirect("/orgprovince");}
  if(value == "Genre"){res.redirect("/orggenre");}
});

//Getting all items from db 
app.get('/orgall', function (req,res) {
  var sql = 'SELECT * FROM organasation';
  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err);
    }
    else{
      //console.log(data)
      // display data
      res.render('all_artist', {results : data, form : true, number : data.length});
     }
    });

});

//Search by Name
app.get('/orgname', function (req,res) {
  var search_name = search;
  
  
  //SELECT * FROM artist WHERE  surname LIKE "ndlovu" or name like "ndlovu"
var sql = 'SELECT * FROM organasation WHERE companyname LIKE "%' + search_name + '%"' + 'OR orgname LIKE "%' + search_name + '%"' ;
  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err);
    }
    else if (data == ""){
      if (req.session.loggedin){
        res.render('search', {message: 'No records found of ' + search_name + ' try another name',  form : true, login: false});
      }
      else{
      res.render('search', {message: 'No records found of ' + search_name + ' try another name',  form : false, login: false} );
      }
    }
    else{
      if (req.session.loggedin){
       res.render('all_artist', {results : data, form: true,  number : data.length});
      }
      else {
       res.render('all_artist', {results : data, form: false,  number : data.length});
      }
       }
    });

});

//Search by province
app.get('/orgprovince', function (req,res) {
  var search_province = search;
  var sql = 'SELECT * FROM organasation WHERE orgprovince LIKE "%' + search_province + '%"';
  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err);
    }
    else if (data == ""){

      if (req.session.loggedin){
        res.render('search', {message: 'No records found of ' + search_province + ' try another name',  form : true, login: false});
      }
      else{
      res.render('search', {message: 'No records found of ' + search_province + ' try another name',  form : false, login: false} );
      }
    }
    else{
      if (req.session.loggedin){
        res.render('all_artist', {results : data, form: true,  number : data.length});
      }
      else {
        res.render('all_artist', {results : data, form: false,  number : data.length});
      }
       }
    });

});

//Search by genre
app.get('/orggenre', function (req,res) {
  var search_genre = search;
  var sql = 'SELECT * FROM organasation WHERE orgcategory LIKE "%' + search_genre + '%"';
  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err);
    }
    
    else if (data == ""){
      if (req.session.loggedin){
        res.render('search', {message: 'No records found of ' + search_genre + ' try another name',  form : true, login: false});
      }
      else{
      res.render('search', {message: 'No records found of ' + search_genre + ' try another name',  form : false, login: false} );
      
      }
    }
    else{
      if (req.session.loggedin){
        res.render('all_artist', {results : data, form: true, number : data.length});
        
      }
      else {
        res.render('all_artist', {results : data, form: false,  number : data.length});
       
      }
       }
    });

});

app.get('/orgdetails/:id', function(req, res){
  var id = req.params.id;
   var sql = "SELECT * FROM organasation WHERE id = " + id;
   db.query(sql, function(err, data, fields){
     if (err){
       console.log(err);
     }
     else{
       if (req.session.loggedin){
         res.render("details", {results : data, form : true });
       }
    else{ res.render('details', {results : data, form: false});}
      }
     });
   
 }); 

 app.get('/orgdelete/:id', function(req, res){
  if (req.session.loggedin){
  var id = req.params.id;
  var sql = 'DELETE FROM organasation WHERE id = ' + id;

  db.query(sql, function(err, data, fields){
    if (err){
      console.log(err);
    }
    else {
    res.redirect("/");
    }
  
});}

});

 app.get('/orgedit', function(req, res){
  if (req.session.loggedin){
    res.render('orgedit',{message: false, form: true});
  }

  else {res.render("search", {message : "Please login in first", form : false, login: false});}

});

app.post("/orgedit/:id", function(req, res){
  var id = req.params.id;
  console.log(id);
  var name = req.body.name;
  var surname = req.body.surname;
  var companyname = req.body.companyname;
  var province = req.body.province;
  var address = req.body.address;
  var email = req.body.email;
  var phone = req.body.phone;
  var namefull = name + " " + surname;
  var category = req.body.category;
  var website = req.body.website;
  var twitter = req.body.twitter;
  var facebook = req.body.facebook;
  var instagram = req.body.instagram;
 
  var sql = "UPDATE organasation SET companyname = ?, orgname = ?, orgphonenumber = ?, orgemail = ?, orgprovince = ?, orgcategory= ?, orgaddress = ?, website = ?, orgtwitter = ?, orgfacebook = ?, orginstagram = ? WHERE id = ?;";

  db.query(sql, [companyname, namefull, phone, email, province, category, address, website, twitter, facebook, instagram, id], function(err, data){
    if (err){
      res.render('form', {message : err, form : true});
    }
    else{
     res.redirect("/orgdetails/" + id) ;
     }
    });
});

//Start Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
