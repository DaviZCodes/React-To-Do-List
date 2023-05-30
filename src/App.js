import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function addTodo(input_text){

}

function App() {
  //use State hook
  const [toDo, settoDo] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <header id = "head"> Write your to-dos here. </header>

        <div class = "Add-To-Do"> 
          <input type = "text" id = "input" placeholder="Write your to-do..." 
            value = {toDo} onChange = {item => settoDo(item.target.value)}></input>
          <button id = "button" onClick = {addTodo}> Add To-Do </button>
        </div>
      </header>
    </div>
  );
}

export default App;
