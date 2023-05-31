import './App.css';
import { useState, useEffect } from 'react';
import List from './List';

//Typescript translation

function App(){

  //use State hook
  const [toDo, settoDo] = useState("");
  const [ourList, setourList] = useState([]);
  const [congrats, setCongrats] = useState();

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

  function removeItem(given_id){

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

  const handleKeypress = event => {
    //it triggers by pressing the enter key
    if (event.code === "Enter") {
      addTodo();
    }
  };

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
        <div class = "Congrats">
          <p>
          {congrats}
          </p>
        </div>
      </header>
    </div>
  );
}
export default App;

