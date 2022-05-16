const express = require('express');
const router = express.Router();
const passport = require('passport');
function isLogin(req, res, next) {
    if(req.user) { 
       res.redirect('/');
     } else {
        next();
   }
}


router.get('/', isLogin, (req, res) => res.redirect('https://discord.com/api/oauth2/authorize?client_id=955323669834526751&redirect_uri=https%3A%2F%2Fpungpound.xyz%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds&prompt=none'))

router.get('/callback', isLogin, passport.authenticate('discord', { failureRedirect: '/auth' }), (req, res) => {
	res.render('loginyes');
});

module.exports =  router;