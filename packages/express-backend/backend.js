// backend.js
import express, { response } from "express";
import cors from "cors";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(user => user["name"] === name && user["job"] === job);
}

  const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };
  
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
  });

 const userFindIndex = (id) => users["users_list"].findIndex(user => user["id"] === id);

  app.get("/users/find", (req, res) => {
    let username = req.query["name"];
    let userjob  = req.query["job"];
    let result = findUserByNameAndJob(username, userjob);
    //result = { users_list: result };
    res.send(result);
   
  } );

  app.delete("/users/:id", (req, res) => {
    let userToDeleteID = req.params["id"]
    let index = userFindIndex(userToDeleteID)
    
    if (index !== -1) {
        users["users_list"].splice(index, 1); // Remove resource from the array
        return res.status(204).send(); // No content
    } else {
        return res.status(404).json({ message: 'Resource not found' });
    }
  });

  const findUserById1 = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById1(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});
  app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };