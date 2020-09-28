import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowBack } from "../icons/arrow_back.svg";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const Title = styled.h1`
  color: rgba(255, 255, 255, 1);
  font-size: 1rem;
  margin: 3rem 0 3rem 0;
`;

const FormWrapper = styled.div`
  font-family: Montserrat;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0a155a;
`;

const TextInput = styled.input.attrs({ type: "text" })`
  height: 2.5rem;
  width: 100%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  background-color: transparent;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.6);
  border: none;
  padding-left: 1rem;
  border-bottom: 1px solid #bbc8d8;
  caret-color: #3d47af;

  &:focus {
    border-bottom: 2px solid #bb86fc;
    color: rgba(255, 255, 255, 0.8);
  }

  &:focus + label {
    color: #bb86fc;
  }
`;

const InputLabel = styled.label`
  font-family: Montserrat;
  color: #bbc8d8;
  font-size: 0.8rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 3rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: rgba(0, 0, 0, 1);
  background-color: #bb86fc;
  margin-bottom: 1rem;
`;

const DeleteButton = styled.button`
  width: 90%;
  height: 3rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: rgba(0, 0, 0, 1);
  background-color: #cf6679;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 1rem;
`;

export default function TaskDetail({
  handleCancel,
  handleSubmit,
  handleDelete,
  task,
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
    <FormWrapper>
      <HeaderWrapper>
        <ArrowBack
          onClick={handleCancel}
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            fill: "rgba(255, 255, 255, 0.6)",
            cursor: "pointer",
          }}
        />

        <Title>Details</Title>
      </HeaderWrapper>

      <Form onSubmit={handleSubmit(values)}>
        <InputWrapper>
          <TextInput
            onChange={handleChange}
            name="title"
            value={values.title}
          />
          <InputLabel htmlFor="title">Title</InputLabel>
        </InputWrapper>
        <InputWrapper>
          <TextInput
            onChange={handleChange}
            name="description"
            value={values.description}
          />
          <InputLabel htmlFor="description">Description</InputLabel>
        </InputWrapper>

        <SubmitButton type="submit">EDIT</SubmitButton>
      </Form>
      <DeleteButton onClick={() => handleDelete(values.id)}>
        DELETE
      </DeleteButton>
    </FormWrapper>
  );
}
