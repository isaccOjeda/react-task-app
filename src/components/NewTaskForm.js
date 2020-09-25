import React, { useState } from "react";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #222223;
`;

const TextInput = styled.input.attrs({ type: "text" })`
  height: 2.5em;
  width: 100%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.15);
  margin-bottom: 1em;
  color: #fff;
  border: none;
  padding-left: 1em;
`;

const CancelButton = styled.button`
  width: 100%;
  height: 3em;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: rgba(0, 0, 0, 1);
  background-color: #ff0266;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 3em;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: rgba(0, 0, 0, 1);
  background-color: #bb86fc;
  margin-bottom: 1em;
`;

const Form = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  m
`;
export default function NewTaskForm({ handleCancel, handleSubmit }) {
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(values)}>
        <TextInput onChange={handleChange} name="title" value={values.title} />
        <TextInput
          onChange={handleChange}
          name="description"
          value={values.description}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
        <CancelButton onClick={handleCancel}>Discard</CancelButton>
      </Form>
    </FormWrapper>
  );
}
