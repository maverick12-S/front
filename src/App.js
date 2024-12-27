import React,{ useEffect, useState} from "react";
import { getHelloMessage} from "./api/api";

function App(){
  const[name, setName] = useState("");
  const[responseMessage, setResponseMessage] = useState();
  const[message,setMessage] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:8080/api/add",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name}),
      });      

      const data = await response.json();
      setResponseMessage(data.message);
    }catch(error){
      setResponseMessage("Errorが発生しました。");
    }
  };
  useEffect(() =>{
    getHelloMessage()
      .then(data => setMessage(data))
      .catch(err => console.error(err));
  },[]);

  return (
    <div className="App">
      <h1>React anf Spring Boot Integration</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Name;
          <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
        </form>
        <p>Response:{responseMessage}</p>
      </div>
  )
}
export default App;