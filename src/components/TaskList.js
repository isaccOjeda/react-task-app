import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";
import styled from "styled-components";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import handleViewport from "react-in-viewport";
import AddButton from "./AddButton";
import ConfirmDelete from "./ConfirmDelete";

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
  const [tasksList, setTasksList] = useState([]);
  const [upAddbutton, setupAddbutton] = useState(false);
  const [downAddbutton, setdownAddbutton] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [confirmWindow, setConfirmWindow] = useState(false);
  const [taskToDelete, settaskToDelete] = useState(null);

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

  const closeConfirmWindow = () => {
    setConfirmWindow(false);
  };

  useEffect(() => {
    if (category._id) {
      axios
        .get(`/tasks/category=${category._id}`)
        .then(function (response) {
          // handle success
          setTasksList(response.data);
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

  const openConfirmDelete = (task) => {
    settaskToDelete(task);
    setConfirmWindow(!confirmWindow);
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
        setTasksList(tasksList.filter((task) => id !== task._id));
        setConfirmWindow(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const addTask = (data) => (e) => {
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
        setTasksList([...tasksList, response.data]);
        setcreateTaskForm(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const completeTask = (id) => (event) => {
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
        setTasksList(
          tasksList.map((task) =>
            task._id === response.data._id ? response.data : task
          )
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const editTask = (data) => (e) => {
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
        setTasksList(
          tasksList.map((task) =>
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

  const openEditForm = (task) => {
    setEditTaskForm(true);
    setTaskToEdit(task);
  };

  if (createTaskForm) {
    return (
      <AddTask
        handleCancel={closeCreateForm}
        handleSubmit={addTask}
        category={category}
      />
    );
  }

  if (editTaskForm) {
    return (
      <EditTask
        handleCancel={closeEditForm}
        handleSubmit={editTask}
        task={taskToEdit}
        category={category}
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

        {tasksList.map((task) => (
          <Task
            category={category}
            key={task._id}
            handleChange={completeTask}
            task={task}
            openEditForm={openEditForm}
            handleDelete={openConfirmDelete}
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
      {confirmWindow && (
        <ConfirmDelete
          handleClose={closeConfirmWindow}
          task={taskToDelete}
          handleConfirm={deleteTask}
        />
      )}
    </TaskListContainer>
  );
}
