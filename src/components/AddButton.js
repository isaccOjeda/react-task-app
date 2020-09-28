import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  background-color: ${(props) => props.main_color};
  height: 3rem;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  color: #fff;
  margin-bottom: 2em;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
`;

export default function AddButton({
  openCreateForm,
  forwardedRef,
  isVisible,
  main_color,
}) {
  return (
    <StyledButton
      main_color={main_color}
      isVisible={isVisible}
      ref={forwardedRef}
      onClick={openCreateForm}
    >
      + ADD NEW TASK
    </StyledButton>
  );
}
