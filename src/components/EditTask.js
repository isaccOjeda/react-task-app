import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowBack } from "../icons/arrow_back.svg";
import { ReactComponent as WorkTaskListIcon } from "../icons/work_task_list_icon.svg";

const MainContainer = styled.div`
  font-family: Montserrat;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  padding: 0 1.5em;
  height: 100%;
  background-color: #fff;
`;

const HeaderContainer = styled.div`
  height: 30%;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
`;

const Title = styled.h1`
  width: 70%;
  margin-top: 1rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
`;

const TextInput = styled.input.attrs({ type: "text" })`
  height: 3rem;
  width: 100%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  background-color: transparent;
  color: #56545b;
  border: none;
  padding-left: 1rem;
  border-bottom: 1px solid #56545b;
  caret-color: #56545b;

  &:focus {
    border-bottom: 2px solid ${(props) => props.main_color};
    color: #000;
  }

  &:focus + label {
    color: ${(props) => props.main_color};
    font-weight: bold;
  }
`;

const InputLabel = styled.label`
  color: #c6cad8;
  font-size: 0.8rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #1d1e1f;
  height: 3rem;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  color: #fff;
  margin-bottom: 2em;
`;

const Form = styled.form`
  height: 70%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 2rem;
`;

const SectionContainer = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.8rem;
  background-color: #fff;
  border: 1.2px solid #e2e6ee;
  border-radius: 15px;
  margin-bottom: 3rem;
`;

const TaskListIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.3rem;
  width: 2.3rem;
  border: none;
  background-color: ${(props) => props.light_color};
  margin-left: 0.8rem;
  border-radius: 25%;
`;

const TaskListName = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
`;
const TaskListNameContainer = styled.div`
  width: 50%;
  margin-left: 0.8rem;
`;

export default function EditTask({
  handleCancel,
  handleSubmit,
  task,
  task_list,
}) {
  const [values, setValues] = useState({
    id: task._id,
    title: task.title,
    description: task.description,
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <ArrowBack
          onClick={handleCancel}
          style={{
            fill: "black",
            cursor: "pointer",
            marginTop: "1.5rem",
          }}
        />

        <Title>Edit Task</Title>
      </HeaderContainer>

      <Form onSubmit={handleSubmit(values)}>
        <InputContainer>
          <TextInput
            main_color={task_list.main_color}
            onChange={handleChange}
            name="title"
            value={values.title}
            autoFocus
          />
          <InputLabel htmlFor="title">Task name</InputLabel>
        </InputContainer>

        <SectionContainer>
          <TaskListIconContainer light_color={task_list.light_color}>
            <WorkTaskListIcon style={{ fill: `${task_list.main_color}` }} />
          </TaskListIconContainer>
          <TaskListNameContainer>
            <TaskListName>{task_list.name}</TaskListName>
          </TaskListNameContainer>
        </SectionContainer>

        <SubmitButton type="submit">EDIT</SubmitButton>
      </Form>
    </MainContainer>
  );
}
