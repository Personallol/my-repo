const express = require('express');
const app = express(); 
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const os = require('os');
app.use(session({ secret: 'cats', name: 'lol', maxAge: '1d', resave: false, saveUninitialized: true, cookie: { secure: false } }));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use('/blog', require('./routes/bloglike.js'));
app.use('/auth', require('./routes/auth.js'));
app.use('/', require('./routes/dashboard.js'));

// const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GoogleStrategy = require('passport-discord').Strategy;

passport.use(new GoogleStrategy({
    clientID:     '955323669834526751',
    clientSecret: 'ShB_kF19aafsKyfVR-6Z_l0DYIOcKyul',
    callbackURL: 'https://pungpound.xyz/auth/callback',
//     passReqToCallback   : true
    scope: ['identify', 'guilds']
  },
  function(request, accessToken, refreshToken, profile, done) {
   console.log(profile);
   return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
     done(null, user);
});

passport.deserializeUser((user, done) => {
     done(null, user);
});

app.get('/', (req, res) => {
//     res.render('index', { user: req.user });
    res.render('test', { user: req.user });
});

app.get('/testlol', (req, res) => {
	res.render('test');
});

app.get('/maintenance', (req, res) => {
     res.render('maintenance');
});

app.get('/health', (req, res) => {

     const data = {
          uptime: 'Nothing',
          message: 'Ok',
          date: new Date()
     }

     res.status(200).send(data);
});

app.get('*', (req, res) => {
	res.redirect('/');	
});

app.listen(3000);
