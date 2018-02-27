var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db.js');
var bcrypt = require('bcrypt');


passport.use('local', new LocalStrategy(
  function(username, password, done){
    db.connect(function(err){
      var dbase = db.getDb().collection('samosval_ufa_admin');
      return dbase.findOne({username: username}, function(err, instance){
        if(err){console.log(err); return done(null, false)}
        if(instance){
          bcrypt.compare(password, instance.password, function(err, resp){
            if(err){console.log(err); return done(null, false)}
            if(resp===true){
              console.log('Admin '+username+' has just logged in');
              return done(null, username);
            }else{return done(null, false);}
          });
        }else{
          console.log('Password is incorrect');
          return done(null, false);
        }
      })
    });
  }
));

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(username, done){
  done(null, username);
});

module.exports = passport;