const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

// (now)  (for mLab )
const uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://127.0.0.1:27017/heroku_0jxxb521';  //now

  //^replaced todos with mLab db

let Todo = require('./todo.model');


app.use(cors());
app.use(bodyParser.json());

//(now)
// mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });   //now
//number from mongo window in terminal, todos is the db name
// const connection = mongoose.connection;     //(now)


// (for mLab):
mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });
//(now)
// connection.once('open', function(){
// 	console.log("MongoDB database connection established successfully");
// } )    //now


todoRoutes.route('/').get(function(req, res){
	Todo.find(function(err, heroku_0jxxb521){
		if (err) {
			console.log(err);
		} else {
			res.json(heroku_0jxxb521);
		}
	});
});

// to retreat one specific todo:
todoRoutes.route('/:id').get(function(req, res) {
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
});
todoRoutes.route('/update/:id').post(function(req, res){
	Todo.findById(req.params.id, function(err, todo){
		if (!todo)
			res.status(404).send('data is not found');
		else
			todo.todo_description = req.body.todo_description;
			todo.todo_responsible = req.body.todo_responsible;
			todo.todo_priority = req.body.todo_priority;
			todo.todo_completed = req.body.todo_completed;

			todo.save().then(todo => {
				res.json('Todo updated');
			})
			.catch(err => {
				res.status(400).send("Update not possible");
			});
	});
});


app.use('/heroku_0jxxb521', todoRoutes);

app.listen(process.env.PORT || 4000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



