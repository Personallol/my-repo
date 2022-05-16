const express = require('express');
const router = express.Router();
function notLogin(req, res, next) {
	req.user ? next() : res.redirect('/auth');
}

router.get('/logout', notLogin, (req, res) => {
     req.logout();
     req.session.destroy();
	res.redirect('/');
});

router.get('/profile', notLogin, (req, res) => {
	res.render('profile', { user: req.user, guilds: req.user.guilds });
});

module.exports = router;
