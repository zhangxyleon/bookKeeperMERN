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
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
const PORT = process.env.PORT || 5000;
app.listen(app.get('port'), (server) => {
	console.info(`Server listen on port ${app.get('port')}`);
});
