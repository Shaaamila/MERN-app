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

todoRoutes.route('/').get(function(req, res){
	Todo.find(function(err, todos){
		if (err) {
			console.log(err);
		} else {
			res.json(todos);
		}
	});
});

//to retreat one specific todo:
todoRoutes.route('/:id').get(function(req, res){
	let id = req.params.id;
	Todo.findById(id, function(err, todo){
		res.json(todo);
	});
});

//endpoint to send http post request when adding todo to DB:
todoRoutes.route('/add').post(function(req, res){
	let todo = new Todo(req.body);
	todo.save()
		.then(todo => {
			res.status(200).json({'todo': 'todo added successfully'});
		})
		.catch(err => {
			res.status(400).send('adding new todo failed');
		});
})

app.use('/todos', todoRoutes);

app.listen(PORT, function(){
	console.log('server is running on Port:' + PORT);
});



