// Use Node.js and Express.js to set up a simple server.
// Use MongoDB (you can use MongoDB Atlas for a quick setup) to store the to-do items.
// Create a REST API with the following endpoints:
// GET /todos: Fetch all to-do items.
// POST /todos: Add a new to-do item.
// DELETE /todos/:id: Delete a to-do item by ID.

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");


const todoSchema = new mongoose.Schema({
  text: String,
});

const Todo = mongoose.model("Todo", todoSchema);

mongoose
  .connect("mongodb://127.0.0.1:27017/todo")
  .then(() => console.log("Connected!"));

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json())

app.get("/todo", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.send(JSON.stringify(todos));
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/todo", async (req, res) => {
  const reqText = req.body;
  const newTodo = Todo(reqText);
  await newTodo.save();
  res.send(`Saved new todo item as doc:${newTodo}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
