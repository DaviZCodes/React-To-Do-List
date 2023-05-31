import logo from './logo.svg';
import './App.css';
import { Component, useState } from 'react';
import List from './List';

function App(){
  //use State hook
  const [toDo, settoDo] = useState("");
  const [ourList, setourList] = useState([]);

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
     settoDo("");
  }

  function removeItem(given_id){

    const updatedArray = ourList.filter(element => element.id !== given_id);

    setourList(updatedArray);
  }

  function clearAll(){
    setourList([]);
  }

  const handleKeypress = event => {
    //it triggers by pressing the enter key
  if (event.keyCode === 13) {
    addTodo();
  }
};

  let display = ""; // This is not working. I wanted to add if length is equal to 0, then there is no more to-dos.

  /*if (ourList.length == 0){
    let display = "Congrats! You have no more to-dos!";
  } else {
    display = ""
  }*/

  return (
    <div className="App">
      <header className="App-header"> 
        <header id = "title" div title = "Click me to wipe all to-dos" onClick={clearAll}> Davi's To-Dos </header>
        <header id = "head"> Write your to-dos here. </header>

        <div class = "Add-To-Do"> 
          <input type = "text" id = "input" placeholder="Write your to-do..." 
            value = {toDo} onChange = {item => settoDo(item.target.value)} onKeyDown = {handleKeypress}>
            </input>
          <button id = "button" onClick = {addTodo}> Add To-Do </button>
        </div>
        <div class = "MainList">
          <List parentList = {ourList} removeFunc = {removeItem}/>
        </div>
      </header>
    </div>
  );
}
export default App;

