//throw new Error('1337 : GL1CH 1N TH3 M47R1X');
//Import express
const express = require("express");
//Import Mongoose
const mongoose = require('mongoose');
//Import routes
const routes = require('./routes/index');
//Import Body parser
const bodyParser = require('body-parser');
//Initialise the server
const server = express();

mongoose.Promise = global.Promise;
// Configure bodyparser to handle post requests
server.use(bodyParser.urlencoded({
	extended: true
}));
server.use(bodyParser.json());
// Use Api routes in the App
//server.use('/', routes);
routes(server);

server.listen(3050, () => {
	console.log("Ecoute sur le port 3050");
	// Connect to Mongoose and added check for DB connection
	mongoose.connect('mongodb://localhost/user_api_database', {
		useMongoClient: true,
	});
	mongoose.connection
		.once('open', () => console.log("Connexion à la mongoDB établie"))
		.on('error', (error) => {
			console.warn('warning', error);
		})
});
