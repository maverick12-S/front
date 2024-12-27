import React,{ useEffect, useState} from "react";
import { getHelloMessage } from "./api/api";

function App(){
  const[message,setMessage] = useState("");

  useEffect(() =>{
    getHelloMessage()
      .then(data => setMessage(data))
      .catch(err => console.error(err));
  },[]);

  return (
    <div className="App">
      <h1>React anf Spring Boot Integration</h1>
      <p>{message}</p>
      </div>
  )
}

export default App;