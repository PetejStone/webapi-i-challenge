// implement your API here
const express = require('express');

const db = require('./data/db.js')
const {users} = db;
// creates an express application using the express module
const server = express();

//middleware that returns the body
server.use(express.json())
// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World!');
});

server.get('/api/users', (req, res) => {
    users.find()
    .then(users => {
        res.send(users)
    })
    .catch(err => {
        res.status(500).json({error: "There was an error while saving the user to the database"} )
    })
  });


server.get('/api/users/:id', (req, res) => {
  
});

server.post('/api/users', (req, res) => { 

   const newUser = req.body
  
   users.insert(newUser)
   .then(addedUser => {
      res.status(201).json(addedUser);
   })
   .catch(err => {
    res.status(500).json({errorMessage:  "Please provide name and bio for the user."} )
})


});

server.put('/api/users/:id', (req, res) => { 
    const {id} = req.params; //which item
    const user = req.body; // how we are updating it -- good to name it the same as in the db

    users.update(id,user)
    .then(updatedUser => {
        if (updatedUser) {   //// if not found, will return null, so you want to check if user is there
            res.json(updatedUser)
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."  })
        }
    })
    .catch( err => {
        res.status(500).json({ error: "The user information could not be modified."} )
       })

});

server.delete('/api/users/:id', (req, res) => { 
    const {id} = req.params;
    users.remove(id)
    .then(removedUser => {
        res.json(removedUser)
    })
    .catch( err => {
     res.status(500).json({ message: "The user with the specified ID does not exist."} )
    })
});




// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));