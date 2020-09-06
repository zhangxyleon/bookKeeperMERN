const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const User = require('../models/user');
const gravatar = require('gravatar');
const passport = require('passport');

router.get('/', (req, res) => {
	User.find({})
		.then(
			(users) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(users);
			},
			(err) => next(err)
		)
		.catch((err) => {
			res.statusCode = 500;
			res.setHeader('Content-Type', 'application/json');
			res.json({ err: err });
		});
});
router.post('/signup', (req, res) => {
	console.log(req.body);
	User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
		if (err) {
			res.statusCode = 500;
			res.setHeader('Content-Type', 'application/json');
			res.json({ err: err });
		} else {
			user.save((err, user) => {
				if (err) {
					res.statusCode = 500;
					res.setHeader('Content-Type', 'application/json');
					res.json({ err: err });
					return;
				}

				// passport.authenticate('local')(req, res, () => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json({ success: true, status: 'Registration Successful!' });
				// });
			});
		}
	});
});

router.post('/login', passport.authenticate('local'), (req, res) => {
	var token = authenticate.getToken({ _id: req.user._id });
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});

module.exports = router;
