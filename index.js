require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let todoList = [
  {
    id: 1,
    task: "learn express",
    done: false
  },
  {
    id: 2,
    task: "learn express-generator",
    done: false
  }
];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//get all todo list
app.get("/", (req, res) => {
  res.send(todoList);
});

app.get("/:id", (req, res) => {
  try {
    const filteredTodo = todoList.find(item => item.id == req.params.id);
    res.send({
      message: "Here is what You looking for",
      filteredTodo
    });
  } catch (error) {
    res.send(error);
  }
});

// add new todo
app.post("/", (req, res) => {
  try {
    let newId = todoList.length + 1;
    let newTodo = {
      id: newId,
      task: req.body.task,
      done: false
    };

    todoList.push(newTodo);

    res.status(200).send({
      message: "todo successfully added",
      todoList
    });
  } catch (error) {
    res.send(error);
  }
});

// ~delete todo by its id~
app.delete("/:id", (req, res) => {
  try {
    const idToDelete = req.params.id;
    let newTodo = todoList.filter(item => item.id !== parseInt(idToDelete));

    todoList = newTodo;

    res.status(200).send(todoList);
  } catch (error) {
    res.send(error);
  }
});

// ~update a todo by its id~
app.put("/:id", (req, res) => {
  try {
    let getTodoToUpdate = todoList.findIndex(data => data.id == req.params.id);

    todoList.map(data => {
      if (data.id == req.params.id) {
        todoList[getTodoToUpdate].task = req.body.task;
      }
    });
    res.send({
      message: "data successfully updated",
      todoList
    });
  } catch (error) {
    res.send(error);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Your server is running on PORT " + process.env.PORT);
});
