import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const FormContainer = styled.div`
  font-family: Montserrat;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  padding: 0 1.5em;
  height: 100%;
  background-color: #fff;
`;

const HeaderContainer = styled.div`
  height: 20%;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const Title = styled.h1`
  width: 70%;
  margin-top: 1rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 2rem;
  width: 100%;
`;

const TextInput = styled.input`
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
    border-bottom: 2px solid #a362ea;
    color: #000;
  }

  &:focus + label {
    color: #a362ea;
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
`;

const Form = styled.form`
  height: 45%;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const NavText = styled.p`
  font-size: 0.7rem;
`;

const NavLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: #a362ea;
`;

export default function Login({ handleNavClick }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [token, settoken] = useState(null);

  const handleSubmit = (data) => (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify(data);

    axios
      .post(`/auth/login/`, body, config)
      .then(function (response) {
        localStorage.setItem("token", response.data);
        settoken(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // If the user its already logged or the form is submit correctly redirects to the Main page.
  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <FormContainer>
      <HeaderContainer>
        <Title>Log-in</Title>
      </HeaderContainer>
      <Form onSubmit={handleSubmit(values)}>
        <InputContainer>
          <TextInput
            autoFocus
            type="text"
            onChange={handleChange}
            name="email"
            value={values.email}
          />
          <InputLabel htmlFor="title">Email</InputLabel>
        </InputContainer>

        <InputContainer>
          <TextInput
            type="password"
            onChange={handleChange}
            name="password"
            value={values.password}
          />
          <InputLabel htmlFor="title">Password</InputLabel>
        </InputContainer>
        <SubmitButton>LOGIN</SubmitButton>
      </Form>
      <NavText>
        new to next step? <NavLink onClick={handleNavClick}>Register</NavLink>
      </NavText>
    </FormContainer>
  );
}
