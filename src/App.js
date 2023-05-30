import logo from './logo.svg';
import './App.css';

function addTodo(input_text){
  
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <header> Write your to-do here. </header>
        <div class = "Add-To-Do">
          <input type = "text" id = "input"></input>
          <button id = "button" onClick = {addTodo}> Add To-Do </button>
        </div>
      </header>
    </div>
  );
}

export default App;
