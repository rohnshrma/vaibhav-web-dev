import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await axios.get("http://localhost:3000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (title === "") return;

    await axios.post("http://localhost:3000/tasks", {
      title,
    });

    setTitle("");

    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);

    loadTasks();
  };

  return (
    <div style={{ width: "400px", margin: "40px auto" }}>
      <h1> To Do App</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Task..."
      />

      <button onClick={addTask}>Add</button>

      <hr />

      {tasks.length === 0 ? (
        <p>No Tasks Found</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};
export default App;
