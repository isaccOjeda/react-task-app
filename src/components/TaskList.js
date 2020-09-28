import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";
import styled from "styled-components";
import NewTaskForm from "./NewTaskForm";
import TaskDetail from "./TaskDetail";
import handleViewport from "react-in-viewport";
import AddButton from "./AddButton";

const TaskListContainer = styled.div`
  font-family: Montserrat;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  overflow: auto;
  padding: 0 0.8rem;
`;

const HeaderContainer = styled.div`
  height: 20%;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
`;

const CategoryName = styled.h2`
  width: 80%;
  margin-top: 1rem;
  font-weight: 700;
`;

const Title = styled.h6`
  font-family: Montserrat;
  margin-top: 2rem;
  color: #c6cad8;
`;

const ListContainer = styled.div`
  height: 80%;
  overflow-y: scroll;
`;

const StyledButton = styled.button`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 10px;
  background-color: #fff;
  border: 2px solid ${(props) => props.main_color};
  height: 2rem;
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 0;
  color: ${(props) => props.main_color};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
`;

const ViewportButton = handleViewport(AddButton);

export default function TaskList({ category }) {
  const [isLoading, setisLoading] = useState(true);
  const [createTaskForm, setcreateTaskForm] = useState(false);
  const [editTaskForm, setEditTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [upAddbutton, setupAddbutton] = useState(false);
  const [downAddbutton, setdownAddbutton] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const showUpAddbutton = () => {
    setupAddbutton(true);
    setdownAddbutton(false);
  };

  const showDownAddbutton = () => {
    setdownAddbutton(true);
    setupAddbutton(false);
  };

  const openCreateForm = () => {
    setcreateTaskForm(true);
  };

  useEffect(() => {
    if (category._id) {
      axios
        .get(`/tasks/category=${category._id}`)
        .then(function (response) {
          // handle success
          setTasks(response.data);
          setisLoading(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [category._id]);

  useEffect(() => {
    if (category._id) {
      axios
        .get(`/tasks/category=${category._id}`)
        .then(function (response) {
          // handle success
          setTasks(response.data);
          setisLoading(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [category._id]);

  const closeCreateForm = () => {
    setcreateTaskForm(false);
  };

  const closeEditForm = () => {
    setEditTaskForm(false);
  };

  const deleteTask = (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    axios
      .delete(`/tasks/${id}`, config)
      .then(function (response) {
        setTasks(tasks.filter((task) => id !== task._id));
        setEditTaskForm(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleCreateSubmit = (data) => (e) => {
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

  const handleTaskComplete = (id) => (event) => {
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

  const handleEditSubmit = (data) => (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify(data);

    axios
      .patch(`/tasks/${data.id}`, body, config)
      .then(function (response) {
        setTasks(
          tasks.map((task) =>
            task._id === response.data._id ? response.data : task
          )
        );
        setEditTaskForm(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const onEditClick = (task) => {
    setEditTaskForm(true);
    setTaskToEdit(task);
  };

  if (createTaskForm) {
    return (
      <NewTaskForm
        handleCancel={closeCreateForm}
        handleSubmit={handleCreateSubmit}
        category={category}
      />
    );
  }

  if (editTaskForm) {
    return (
      <TaskDetail
        handleCancel={closeEditForm}
        handleSubmit={handleEditSubmit}
        handleDelete={deleteTask}
        task={taskToEdit}
      />
    );
  }

  return (
    <TaskListContainer>
      <HeaderContainer>
        <Title>TASKS LIST</Title>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CategoryName>{category.name} </CategoryName>
          <StyledButton
            main_color={category.main_color}
            isVisible={upAddbutton}
            onClick={() => setcreateTaskForm(true)}
          >
            + TASK
          </StyledButton>
        </div>
      </HeaderContainer>
      <ListContainer>
        {isLoading && <p>Getting Tasks</p>}

        {tasks.map((task) => (
          <Task
            category={category}
            key={task._id}
            handleChange={handleTaskComplete}
            task={task}
            onEditClick={onEditClick}
          />
        ))}
        <ViewportButton
          main_color={category.main_color}
          isVisible={downAddbutton}
          onEnterViewport={() => showDownAddbutton()}
          onLeaveViewport={() => showUpAddbutton()}
          openCreateForm={openCreateForm}
        />
      </ListContainer>
    </TaskListContainer>
  );
}
