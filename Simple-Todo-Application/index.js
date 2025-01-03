const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

module.exports = app;

let notes = [{
    id :1,
    title : "Drink",
    description : "drink water"
}, {
    id :2,
    title : "eat",
    description : "have to eat breakfast"
}, {
    id :3,
    title : "workout",
    description : "have to workout for 30 mins"
}
];

app.get("/todos", (req,res) => {
    res.status(200).send(notes);
    console.log("displaying all the todos");
});

app.get("/todo",(req,res) => {
    const id = parseInt(req.query.id);
    if(id>notes.length || id < 1) {
       return res.status(404).send("Any todo doesnt exist on this id");
    }
    res.status(200).send(notes[id-1]);
});

app.post("/todo",(req,res) => {
    const Ttitle = req.body.title;
    const Tdescription = req.body.description;
    console.log(Ttitle,Tdescription);
    notes.push({id : notes.length+1,title : Ttitle,description : Tdescription});
    res.status(201).send(`todo added with id ${notes.length}`);
    console.log("Done bro !!");
})


app.put("/todo",(req,res) => {
    const id = parseInt(req.query.id);
    notes[id-1] = {id:id,title:req.body.title,description:req.body.description};
    res.status(200).send(notes[id-1]);
    console.log(`updated todo task ${id-1}`);
});

app.delete("/todo",(req,res) => {
    const id = parseInt(req.query.id);
    console.log(id);
    if(id>notes.length || id < 1) {
        return res.status(404).send("Any todo doesnt exist on this id");
     }
    for(let i = id-1;i<notes.length-1;i++) {
        notes[i] = notes[i+1];
        notes[i].id--;
    }
    notes.pop();
    res.status(200).send(`task ${id} deleted succesfully`);
})



app.listen(port,() => {
    console.log(`Listening on Port ${port}`);
});





















/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */


