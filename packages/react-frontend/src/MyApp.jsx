
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

    //--------------useEffect()------------------
    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
      }, [] );

    //--------------removeOneCharacter(index)------------------
    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
        return i !== index;
        });
        setCharacters(updated);
    }

    //--------------updateList(person)------------------
    function updateList(person){
        setCharacters([...characters, person]);
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