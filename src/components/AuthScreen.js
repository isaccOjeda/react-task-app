import React, { useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import Register from "./Register";

const AuthContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export default function AuthScreen() {
  const [login, setlogin] = useState(true);

  const openLogin = () => {
    setlogin(true);
  };

  const openRegister = () => {
    setlogin(false);
  };

  return (
    <AuthContainer>
      <FormContainer>
        {login ? (
          <Login handleNavClick={openRegister} />
        ) : (
          <Register handleNavClick={openLogin} />
        )}
      </FormContainer>
    </AuthContainer>
  );
}
