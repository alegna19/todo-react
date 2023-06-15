import { useEffect, useState } from "react";
import FormTodo from "./components/FormTodo";
import Todos from "./components/Todos";

const initialStateTodos = JSON.parse(localStorage.getItem("todos")) || [];

function App() {
  const [todos, setTodos] = useState(initialStateTodos);

  //Always useEffect is gonna execute in the firts render
  useEffect(() => {
    //with JSON.stringify, transform all todos to String in format JSON - transformar los todos a un string en formato JSON
    //with localStorage I can save the new todos in the localbrowser
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //setTodos received an array and we made a copy and add the new todo
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  //Delete Todo by id
  const deleteTodo = (id) => {
    //devuelveme todo lo que sea distinto al id que le estoy enviando como parametro
    const newArray = todos.filter((todo) => todo.id !== id);
    setTodos(newArray);
  };

  //Update Todo by id
  const updateTodo = (id) => {
    const newArray = todos.map((todo) => {
      if (todo.id === id) {
        todo.state = !todo.state;
      }
      return todo;
    });
    setTodos(newArray);
  };

  //Order Todo by Priority
  const orderTodo = (arrayTodos) => {
    return arrayTodos.sort((a, b) => {
      if (a.priority === b.priority) return 0;
      if (a.priority) return -1;
      if (!a.priority) return 1;
    });
  };

  return (
    <div className="container mb-2">
      <h1 className="my-5 text-center">Form Todo</h1>
      <header className="App-header">
        <FormTodo addTodo={addTodo} />
        <Todos
          todos={orderTodo(todos)}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </header>
    </div>
  );
}

export default App;
