import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("/tasks")
      .then(function (response) {
        // handle success
        setTasks(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          {task.completed && <p style={{ color: "#347814" }}>Completado</p>}
        </div>
      ))}
    </div>
  );
}

export default App;
