import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  //use State hook
  const [toDo, settoDo] = useState("");
  const [ourList, setourList] = useState([]);

  function addTodo(){

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

  let display = ""; // This is not working. I wanted to add if length is equal to 0, then there is no more to-dos.

  /*if (ourList.length == 0){
    let display = "Congrats! You have no more to-dos!";
  } else {
    display = ""
  }*/

  return (
    <div className="App">
      <header className="App-header"> 
        <header id = "title" onClick={() => clearAll()}> Davi's To-Dos </header>
        <header id = "head"> Write your to-dos here. </header>

        <div class = "Add-To-Do"> 
          <input type = "text" id = "input" placeholder="Write your to-do..." 
            value = {toDo} onChange = {item => settoDo(item.target.value)}></input>
          <button id = "button" onClick = {() => addTodo()}> Add To-Do </button>
        </div>

        <div class = "OurList"></div>
        <ol id = "ordered">
          {ourList.map(element => {
            return (
              <div class = "List">
                <li key = {element.id}> {element.desc} <button id = "Delete" 
                onClick = {() => removeItem(element.id)}> Delete To-Do </button> </li> 
              </div>
            );
          })}
        </ol>
        <header> {display} </header>     
      </header>
    </div>
  );
}

export default App;
