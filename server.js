const express = require('express');
const passport = require('passport');
const app = express();
const path = require('path');

app.set('port', process.env.port || 5000);

//connet to Mongodb server
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

connectDB();
app.use(passport.initialize());
app.use(express.json());
app.use('/users', require('./routes/userRoute'));
app.use('/collections', require('./routes/bookmarkRoute.js'));

app.listen(app.get('port'), (server) => {
	console.info(`Server listen on port ${app.get('port')}`);
});
