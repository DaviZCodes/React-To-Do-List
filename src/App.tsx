import './App.css';
import React, { useState, useEffect } from 'react';
import List from "./List";
import Date from "./Date";
import axios from 'axios';

//To-do

interface toDoElement {
  id: number;
  desc: string;
}

function App(){

  //change document/tab title
  useEffect(() =>
  {
    document.title = "Davi's To-Dos"
  }, [])

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

    if (toDo === ""){
      alert("You must write a to-do");
      return
    }

    // creating a unique id for the array to help filter
    const newItem = {
      id : Math.floor(Math.random() * 20000),
      desc: toDo
    }

    setourList(previousList => {
      const updatedList = [...previousList, newItem];

      let stringed = JSON.stringify(updatedList);
      localStorage.setItem("ourL", stringed);
      return updatedList;
    });
     settoDo("");
  }

  function removeItem(given_id : number){

    setourList(previousList => {;
    const updatedArray = ourList.filter(element => element.id !== given_id);

    let stringed = JSON.stringify(updatedArray);
    localStorage.setItem("ourL", stringed);

    return updatedArray;
    });
  }

  function clearAll(){
    setourList([]);
    localStorage.setItem("ourL", "[]");
  }

  function sayCongrats () {
    if (ourList.length !== 0){
      setCongrats("");
    }
    else {
      setCongrats("Congrats! You have no to-dos!");
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

        <div className="current-time"><Date/></div>

        <div className = "motivational">
          <header id = "motivation" title = "Click me for a new quote" onClick = {getQuote}> Free Motivation </header>
          <p id = "quote" title = "Click me for a new quote" onClick = {getQuote}> {quote} </p>
        </div>

        <header id = "head"> Write your to-dos here! </header>

        <div className = "Add-To-Do"> 
          <input type = "text" id = "input" placeholder="Write your to-do..." className="smaller" 
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

