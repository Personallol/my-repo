const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('blogs/index');
});

router.get('/how-to-create-web', (req, res) => {
	res.render('blogs/create-web');
});

module.exports = router;
