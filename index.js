const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require('cors');
app.use(bodyParser.json());

app.use(cors());

let todos = [
  {
    id: 1,  // unique id  
    title: "Learn Node.js",
    description: "I should learn Node.js to become a fullstack developer"
  }
];

function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

app.get('/todos', (req, res) => {
  res.json(todos);
});

// app.get('/todos/:id', (req, res) => {
//   const todoIndex = findIndex(todos, parseInt(req.params.id));
//   if (todoIndex === -1) {
//     res.status(404).send();
//   } else {
//     res.json(todos[todoIndex]);
//   }
// });

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    title: req.body.title,
    description: req.body.description
  };
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and Description are required' });
  }
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// app.put('/todos/:id', (req, res) => {
//   const todoIndex = findIndex(todos, parseInt(req.params.id));
//   if (todoIndex === -1) {
//     res.status(404).send();
//   } else {
//     todos[todoIndex].title = req.body.title;
//     todos[todoIndex].description = req.body.description;
//     res.json(todos[todoIndex]);
//   }
// });

app.delete('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos = removeAtIndex(todos, todoIndex);
    res.status(200).send();
  }
});

// Do this when you are not using cors and basically after using cors u are
// allowing all urls to access your request

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
} );

// for all other routes, return 404
// app.use((req, res, next) => {
//   res.status(404).send();
// });

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
