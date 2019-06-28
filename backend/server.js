const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 3000;

let Todo = require('./todo.model');


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:56815/todos', { useNewUrlParser: true });
//number from mongo window in terminal, todos is the db name
const connection = mongoose.connection;

connection.once('open', function(){
	console.log("MongoDB database connection established successfully");
} )

app.use('/todos', todoRoutes);

app.listen(PORT, function(){
	console.log('server is running on Port:' + PORT);
});



