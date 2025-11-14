import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data.todos);
  };


  const addTodo = async () => {
    if (!title.trim()) return;

    await axios.post("http://localhost:5000/todos", { title });
    setTitle("");
    getTodos(); 
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h2>Todo Site</h2>

      <input
        type="text"
        placeholder="Enter todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t._id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
