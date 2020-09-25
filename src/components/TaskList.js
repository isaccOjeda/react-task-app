import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";
import styled from "styled-components";
import { ReactComponent as NoTask } from "../assets/no_task.svg";
import NewTaskForm from "./NewTaskForm";
const Title = styled.h5`
  font-family: Montserrat;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5em;
`;

const NotFoundText = styled.h3`
  color: rgba(255, 255, 255, 0.8);
  margin: 1em 0;
`;

const StyledButton = styled.button`
  width: 80%;
  background-color: #bb86fc;
  height: 3em;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: #000;
`;

export default function TaskList() {
  const [createTaskForm, setcreateTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("/tasks")
      .then(function (response) {
        // handle success
        setTasks(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const closeForm = () => {
    setcreateTaskForm(false);
  };

  const handleSubmit = (data) => (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify(data);

    axios
      .post(`/tasks`, body, config)
      .then(function (response) {
        setTasks([...tasks, response.data]);
        setcreateTaskForm(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleTaskChange = (id) => (event) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const data = {
      completed: event.target.checked,
    };

    // Request Body
    const body = JSON.stringify(data);

    axios
      .patch(`/tasks/${id}`, body, config)
      .then(function (response) {
        setTasks(
          tasks.map((task) =>
            task._id === response.data._id ? response.data : task
          )
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <div>
      <Title>Tasks</Title>
      {tasks.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <NoTask style={{ width: "12em" }} />
          <NotFoundText>You don't have any tasks yet!</NotFoundText>
          <StyledButton onClick={() => setcreateTaskForm(!createTaskForm)}>
            Create a task
          </StyledButton>
        </div>
      )}
      {tasks.map((task) => (
        <Task
          handleChange={handleTaskChange}
          id={task._id}
          key={task._id}
          title={task.title}
          isCompleted={task.completed}
        />
      ))}
      {createTaskForm && (
        <NewTaskForm handleCancel={closeForm} handleSubmit={handleSubmit} />
      )}
    </div>
  );
}
