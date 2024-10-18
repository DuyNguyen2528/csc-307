// backend.js
import express, { response } from "express";
import cors from "cors";
import userService, { deleteUser } from "./user-services.js";



const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
//---------------mongooose-----------------




//------------------------------------
/* const users = {
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
  }; */



//******------HTTP REQUEST FUNCTION------********

////-------------fetch user-----------------
app.get("/users",  (req, res) => {
  try {
    let userList = userService.fetchlist(); // Await the result of fetchlist
    console.log(userList.all());
    res.status(200).send(userList); // Send the list of users as JSON
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  });

//-------------add user-----------------


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

