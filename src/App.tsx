import './App.css';
import React, { useState, useEffect } from 'react';
import List from './List';
import axios from 'axios';

interface toDoElement {
  id: number;
  desc: string;
}

function App(){

  //use State hook
  const [toDo, settoDo] = useState("");
  const [ourList, setourList] = useState<toDoElement[]>([]);
  const [congrats, setCongrats] = useState("");
  const [quote, setQuote] = useState("You can do it!")

  useEffect(() => {
    let storedArray = localStorage.getItem("ourL");

    if (storedArray){
      let parsed_list = JSON.parse(storedArray);
      setourList(parsed_list);
    }
  }, [])

  useEffect(() => {
    sayCongrats();
  })


  function addTodo(){

    if (toDo == ""){
      alert("You must write a to-do");
      return
    }

    // creating a unique id for the array to help filter
    const newItem = {
      id : Math.floor(Math.random() * 20000),
      desc: toDo
    }

    setourList(previousList => [...previousList, newItem]);

    let stringed = JSON.stringify(ourList);
    localStorage.setItem("ourL", stringed);
     settoDo("");
  }

  function removeItem(given_id : number){

    const updatedArray = ourList.filter(element => element.id !== given_id);

    setourList(updatedArray);

    let stringed = JSON.stringify(ourList);
    localStorage.setItem("ourL", stringed);
  }

  function clearAll(){
    setourList([]);
    let stringed = JSON.stringify(ourList);
    localStorage.setItem("ourL", stringed);
  }

  function sayCongrats () {
    if (ourList.length !== 0){
      setCongrats("");
    }
    else {
      setCongrats("Congrats! You have no more to-dos!");
    }
  }

  const handleKeypress = (event : React.KeyboardEvent<HTMLInputElement>) => {
    //it triggers by pressing the enter key
    if (event.code === "Enter") {
      addTodo();
    }
  };

  function getQuote() {
    axios.get("https://zenquotes.io/api/random")
    .then(response => {
      const data = response.data;
      setQuote(data[0].q);
    })
    .catch(error => {
      console.error("API FAILED", error);
      setQuote("Quote could not be acquired by the API.")
    });
  }
  return (
    <div className="App">
      <header className="App-header"> 
        <header id = "title" title = "Click me to wipe all to-dos" onClick={clearAll}> Davi's To-Dos </header>
        <div className = "motivational">
          <header id = "motivation" title = "Click me for a new quote" onClick = {getQuote}> Free Motivation </header>
          <p id = "quote" title = "Click me for a new quote" onClick = {getQuote}> {quote} </p>
        </div>
        <header id = "head"> Write your to-dos here. </header>

        <div className = "Add-To-Do"> 
          <input type = "text" id = "input" placeholder="Write your to-do..." 
            value = {toDo} onChange = {item => settoDo(item.target.value)} onKeyDown = {handleKeypress}>
            </input>
          <button id = "button" onClick = {addTodo}> Add To-Do </button>
        </div>
        <div className = "MainList">
          <List parentList = {ourList} removeFunc = {removeItem}/>
        </div>
        <div className = "Congrats">
          <p>
          {congrats}
          </p>
        </div>
      </header>
    </div>
  );
}
export default App;

