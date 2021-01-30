const { request } = require('express');
const express  = require('express');
const app = express();

app.use(express.json());

const tasks = [
  {
    id: 1,
    name: 'Task 1',
    completed: false
  },{
    id: 2,
    name: 'Task 2',
    completed: false
  },{
    id: 3,
    name: 'Task 3',
    completed: false
  }
]

//GET
app.get("/api/tasks",(req,res) => {
  res.send(tasks);
});

//GET (BY ID)
app.get("/api/tasks/:id",(req,res) => {
  const taskId = req.params.id;
  const t = tasks.find(task => task.id === parseInt(taskId));
  if(!t) return res.status(404).send("The task not found.");
  res.send(t);
})

//POST
app.post("/api/tasks",(req,res) => {
  

  if(!req.body.name || req.body.name.length < 3) return res.status(400).send("The name should be at least 3 chars long!");

  const task = {
    id: tasks.length + 1,
    name: req.body.name,
    completed: req.body.completed
  };

  tasks.push(task);
  res.status(201).send(task);
});

//PUT
app.put("/api/tasks/:id",(req,res) => {
  const taskId = req.params.id;
  const t = tasks.find(task => task.id === parseInt(taskId));
  if(!t) return res.status(404).send("The task not found.");
  if(!req.body.name || req.body.name.length < 3) return res.status(400).send("The name should be at least 3 chars long!");
  t.name = req.body.name;
  t.completed = req.body.completed;
  res.send(t);
});


//PATCH
app.patch("/api/tasks/:id",(req,res) => {
  const taskId = req.params.id;
  const t = tasks.find(task => task.id === parseInt(taskId));
  if(!t) return res.status(404).send("The task not found.");
  if(!req.body.name || req.body.name.length < 3) return res.status(400).send("The name should be at least 3 chars long!");
  t.name = req.body.name;
  if(req.body.completed)
    t.completed = req.body.completed;
  res.send(t);
});

//DELETE
app.delete("/api/tasks/:id",(req,res) => {
  const taskId = req.params.id;
  const t = tasks.find(task => task.id === parseInt(taskId));
  if(!t) return res.status(404).send("The task not found.");
  const index = tasks.indexOf(t);
  tasks.splice(index,1);
  res.send(t);
});

const port = process.env.PORT || 3000;

module.exports = app.listen(port,() => console.log(`listening on port ${port}....`));
   