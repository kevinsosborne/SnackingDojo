var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var session = require("express-session")
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');
var passport = require('passport');
var util = require('util');


var GITHUB_CLIENT_ID = "5e79e8cf4bc0f619b71a";
var GITHUB_CLIENT_SECRET = "8b7793ea9f75feebb8e4f9950e6f472260ca984f";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

var app = express()


app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, './public/dist')))
app.use(session({
  secret: 'secre123t',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());


// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }),
  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      // console.log(res);
      console.log(req.session);
      res.redirect('/');
    });

  // GET /auth/github/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function will be called,
  //   which, in this example, will redirect the user to the home page.
  

    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });
//     app.get('userName',
// ensureAuthenticated(req,res,next)
//   )
require('./server/config/mongoose.js')

var routes_setter = require('./server/config/routes.js')
routes_setter(app)

app.listen(8000, ()=>{
  console.log('listening on port 8000')
})



// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
