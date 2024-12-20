
import React, { useState, useEffect } from "react"
import Table from "./Table";
import Form from "./Form";



function MyApp() {

    ///////// STAGE LIST //////////////
    const [characters, setCharacters] = useState([]);


    ///////// HELPER FUNCTION /////////////
    //--------------fetchUser()------------------
    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    //--------------postUser(person)------------------
    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        return promise;
      }

    //--------------useEffect()------------------
    useEffect(() => {
        fetchUsers()
            .then((res) => {
                if(res.status !== 201) {
                    
                    throw Error("error loading");
                }
                else {
                    console.log(res.status);
                    return res.json();
                }
            })
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log("error loading"); });
      }, [] );

    //--------------removeOneCharacter(index)------------------
    function removeOneCharacter(index) {
        let id = characters.at(index).id;
        //console.log(id);
        const promise = fetch(`Http://localhost:8000/users/${id}`, {
            method: "DELETE"
        });
        promise.then((res) => {
            if(res.status === 204) {
                const updated = characters.filter((character, i) => {
                    return i !== index;
                });
                setCharacters(updated);
                console.log(res.status);
            }
            else if(res.status === 404) {
                console.log("Resource not found");
            }
        })
        
    }

    //--------------updateList(person)------------------
    function updateList(person){
        //----old code---
        //setCharacters([...characters, person]);
        //---------------------
        
        postUser(person)
        .then((res) => {
        if(res.status !== 201) {
            throw new Error("error adding");
            
        }
        else {
            console.log(res.status);
            return res.json();
        }
        
      })
      .then((data) => {
        setCharacters([...characters, data]);
        
        
      })
      .catch((error) => {
        console.log(error);
      })
    }

    //--------------return------------------
  return (
    <div className="container">
        <Table 
            characterData={characters} 
            removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit = {updateList}/> 
        
    </div>
  );
}
export default MyApp;