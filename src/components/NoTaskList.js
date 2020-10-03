import React from "react";
import styled from "styled-components";
import AddTaskList from "./AddTaskList";

const MainContainer = styled.div`
  font-family: Montserrat;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  width: 80%;
  overflow: auto;
  padding: 1rem 0.8rem;
`;

const HeaderContainer = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 20%;
`;

const Title = styled.h4`
  font-family: Montserrat;
  width: 100%;
  margin-bottom: 1.5rem;
  font-weight: 500;
  font-size: 1.4rem;
`;

const StyledButton = styled.button`
  font-family: Montserrat;
  width: 100%;
  background-color: #000;
  height: 3rem;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  color: #fff;
  margin-bottom: 2em;
`;

export default function NoTaskList({
  addTaskList,
  taskListForm,
  openTaskListForm,
  closeTaskListForm,
}) {
  if (taskListForm) {
    return (
      <AddTaskList handleCancel={closeTaskListForm} onSubmit={addTaskList} />
    );
  }
  return (
    <MainContainer>
      <HeaderContainer>
        <Title>You don't have any task list yet</Title>
        <StyledButton onClick={openTaskListForm}>+ ADD TASK LIST</StyledButton>
      </HeaderContainer>
    </MainContainer>
  );
}
