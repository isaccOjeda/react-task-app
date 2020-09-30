import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowBack } from "../icons/arrow_back.svg";
import { ReactComponent as WorkCategoryIcon } from "../icons/work_category_icon.svg";

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

const CategoryIconContainer = styled.div`
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

const CategoryName = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
`;
const CategoryNameContainer = styled.div`
  width: 50%;
  margin-left: 0.8rem;
`;
export default function AddTask({ handleCancel, handleSubmit, category }) {
  const [values, setValues] = useState({
    title: "",
    category: category._id,
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FormContainer>
      <HeaderContainer>
        <ArrowBack
          onClick={handleCancel}
          style={{
            fill: "black",
            cursor: "pointer",
            marginTop: "1.5rem",
          }}
        />

        <Title>Create New Task</Title>
      </HeaderContainer>

      <Form onSubmit={handleSubmit(values)}>
        <InputContainer>
          <TextInput
            autoFocus
            main_color={category.main_color}
            onChange={handleChange}
            name="title"
            value={values.title}
          />
          <InputLabel htmlFor="title">Task name</InputLabel>
        </InputContainer>
        <SectionContainer>
          <CategoryIconContainer light_color={category.light_color}>
            <WorkCategoryIcon style={{ fill: `${category.main_color}` }} />
          </CategoryIconContainer>
          <CategoryNameContainer>
            <CategoryName>{category.name}</CategoryName>
          </CategoryNameContainer>
        </SectionContainer>
        <SubmitButton type="submit">CREATE TASK</SubmitButton>
      </Form>
    </FormContainer>
  );
}
