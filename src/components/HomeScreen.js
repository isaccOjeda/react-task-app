import React, { useState, useCallback, useEffect } from "react";
import Tasks from "./Tasks";
import styled from "styled-components";
import TaskListNavbar from "./TaskListNavbar";
import { Redirect } from "react-router-dom";
import axios from "axios";
import NoTaskList from "./NoTaskList";

const MainWrapper = styled.div`
  min-height: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

export default function HomeScreen() {
  const [taskListSelected, setTaskListSelected] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [noTaskList, setNoTaskList] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [taskListForm, setTaskListForm] = useState(false);

  const openTaskListForm = () => {
    setTaskListForm(true);
  };

  const closeTaskListForm = () => {
    setTaskListForm(false);
  };

  useEffect(() => {
    const config = {
      headers: {
        "Content-type": "application/json",
        "auth-token": `${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(`/task_list/`, config)
      .then(function (response) {
        // handle success
        setTaskList(response.data);
        if (response.data.length > 0) {
          setTaskListSelected(response.data[0]);
          setisLoading(false);
        } else {
          setNoTaskList(true);
          setisLoading(false);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const addTaskList = (data) => (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
        "auth-token": `${localStorage.getItem("token")}`,
      },
    };

    // Request Body
    const body = JSON.stringify(data);

    axios
      .post(`/task_list/`, body, config)
      .then(function (response) {
        setTaskList([...taskList, response.data]);
        setTaskListSelected(response.data);
        setNoTaskList(false);
        setTaskListForm(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const memoizedSelectTaskList = useCallback((task_list) => {
    setTaskListSelected(task_list);
  }, []);

  if (!localStorage.getItem("token")) {
    return <Redirect to="/auth" />;
  }

  return (
    <MainWrapper>
      {noTaskList ? (
        <NoTaskList
          addTaskList={addTaskList}
          taskListForm={taskListForm}
          openTaskListForm={openTaskListForm}
          closeTaskListForm={closeTaskListForm}
        />
      ) : (
        <Tasks task_list={taskListSelected} />
      )}

      <TaskListNavbar
        addTaskList={addTaskList}
        isLoading={isLoading}
        taskList={taskList}
        selectTaskList={memoizedSelectTaskList}
        taskListSelected={taskListSelected}
        taskListForm={taskListForm}
        openTaskListForm={openTaskListForm}
        closeTaskListForm={closeTaskListForm}
      />
    </MainWrapper>
  );
}
