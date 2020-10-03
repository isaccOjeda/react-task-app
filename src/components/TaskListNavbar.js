import React from "react";
import styled from "styled-components";
import AddTaskList from "./AddTaskList";

const Navbar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 20%;
  background-color: #1d1e1f;
`;

const NavHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
  width: 100%;
`;
const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  align-items: center;
`;
const NavFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
`;

const NavItem = styled.div`
  height: 1.8rem;
  width: 1.8rem;
  background-color: ${(props) =>
    props.isSelected ? props.main_color : "#353943"};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25%;
  cursor: pointer;
  -webkit-box-shadow: 0px 1.8px 0px 1px
    ${(props) => (props.isSelected ? props.dark_color : "#000000")};
  box-shadow: 0px 1.8px 0px 1px
    ${(props) => (props.isSelected ? props.dark_color : "#000000")};
`;

const AddItem = styled.div`
  height: 1.8rem;
  width: 1.8rem;
  background-color: #353943;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25%;
  cursor: pointer;
  -webkit-box-shadow: 0px 1.8px 0px 1px #000000;
  box-shadow: 0px 1.8px 0px 1px #000000;
  color: #fff;
  font-weight: bold;
`;

const Text = styled.p`
  font-family: Montserrat;
  font-size: 0.6em;
  font-weight: bold;
  color: ${(props) => (props.isSelected ? "#fff" : props.main_color)};
`;

export default function TaskListNavbar({
  addTaskList,
  selectTaskList,
  taskListSelected,
  taskList,
  isLoading,
  taskListForm,
  openTaskListForm,
  closeTaskListForm,
}) {
  if (isLoading) {
    return <Navbar />;
  }

  if (taskListForm) {
    return (
      <AddTaskList handleCancel={closeTaskListForm} onSubmit={addTaskList} />
    );
  }

  return (
    <Navbar>
      <NavHeaderContainer />
      <NavItemsContainer>
        {taskList.length > 0 &&
          taskList.map((task_list) => (
            <NavItem
              main_color={task_list.main_color}
              dark_color={task_list.dark_color}
              isSelected={taskListSelected._id === task_list._id}
              key={task_list._id}
              onClick={() => selectTaskList(task_list)}
            >
              <Text
                main_color={task_list.main_color}
                isSelected={taskListSelected._id === task_list._id}
              >
                {task_list.name.slice(0, 1).toUpperCase()}
              </Text>
            </NavItem>
          ))}
        <AddItem onClick={openTaskListForm}>+</AddItem>
      </NavItemsContainer>
      <NavFooterContainer />
    </Navbar>
  );
}
