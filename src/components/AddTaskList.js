import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowBack } from "../icons/arrow_back.svg";
import ColorPicker from "./ColorPicker";

const FormContainer = styled.div`
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
  background-color: #1d1e1f;
`;

const HeaderContainer = styled.div`
  height: 30%;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
`;

const Title = styled.h1`
  width: 80%;
  margin-top: 1rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  color: white;
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

const TextInput = styled.input.attrs({ type: "text" })`
  height: 3rem;
  width: 100%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  background-color: transparent;
  color: #999;
  border: none;
  padding-left: 1rem;
  border-bottom: 1px solid #56545b;
  caret-color: #56545b;

  &:focus {
    border-bottom: 2px solid ${(props) => props.main_color};
    color: white;
  }

  &:focus + label {
    color: ${(props) => props.main_color};
  }
`;

const InputLabel = styled.label`
  color: #999;
  font-size: 0.8rem;
`;

const SubmitButton = styled.button`
  font-family: Montserrat;
  width: 100%;
  background-color: ${(props) => props.main_color};
  height: 3rem;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  color: #fff;
  margin-bottom: 2em;
`;

export default function AddTaskList({ handleCancel, onSubmit }) {
  const [values, setValues] = useState({
    name: "",
    main_color: "#A362EA",
    dark_color: "#502583",
    light_color: "#F5EEFD",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorChange = (color) => {
    setValues({
      ...values,
      main_color: color.main_color,
      dark_color: color.dark_color,
      light_color: color.light_color,
    });
  };

  return (
    <FormContainer>
      <HeaderContainer>
        <ArrowBack
          onClick={handleCancel}
          style={{
            fill: "white",
            cursor: "pointer",
            marginTop: "1.5rem",
          }}
        />
        <Title>Create New Task List</Title>
      </HeaderContainer>
      <Form onSubmit={onSubmit(values)}>
        <InputContainer>
          <TextInput
            main_color={values.main_color}
            autoFocus
            onChange={handleChange}
            name="name"
            value={values.name}
          />
          <InputLabel htmlFor="name">List Name</InputLabel>
        </InputContainer>
        <InputContainer>
          .
          <ColorPicker handleColorChange={handleColorChange} values={values} />
        </InputContainer>
        <SubmitButton main_color={values.main_color} type="submit">
          CREATE TASK LIST
        </SubmitButton>
      </Form>
    </FormContainer>
  );
}
