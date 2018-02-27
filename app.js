module.exports = function(){
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var cookieParser = require('cookie-parser');
  var session = require('express-session');
  var routes_calc = require('./routes/calc.js')();
  var routes_admin = require('./routes/admin.js')();
  var passport = require('./auth.js');
  var isAuth = require('./routes/isAuth.js');
  
  
  app.use(express.static('public'));
  app.set('view engine', 'ejs');
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(session({
    secret: 'samosval_ufa',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  
  
  app.get('/', routes_calc.calculator);
  app.get('/login', routes_admin.login);
  app.post('/login', 
   passport.authenticate('local', {failureRedirect: '/login'}),
   routes_admin.admin_page
  );
  app.get('/admin', isAuth, routes_admin.admin_page);
  app.post('/getPrice', routes_calc.getPrice);
  
    
  app.post('/getMaterials', routes_admin.getMaterials);
  app.post('/editDb', routes_admin.editDb);
  

  return app;
}