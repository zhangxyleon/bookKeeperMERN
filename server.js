const express = require('express');
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

module.exports = connectDB;

app.listen(app.get('port'), (server) => {
	console.info(`Server listen on port ${app.get('port')}`);
});
