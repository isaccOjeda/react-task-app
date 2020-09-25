import React from "react";
import styled from "styled-components";

const TaskContainer = styled.div`
  width: 100%;
  height: 3em;
  display: flex;
  align-items: center;
  margin-bottom: 0.4em;

  background-color: #222223;
  border-radius: 15px;
`;

const Title = styled.div`
  font-family: Montserrat;
  font-size: 0.8em;
  margin: auto;
  width: 85%;
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
  color: ${(props) =>
    props.isCompleted
      ? "rgba(255, 255, 255, 0.38)"
      : "rgba(255, 255, 255, 0.6)"};
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  margin: auto;
  cursor: pointer;
  font-size: 22px;
  line-height: 24px;
  height: 24px;
  width: 15%;
  clear: both;
`;

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.8em;
  width: 0.8em;
  background-color: ${(props) =>
    props.isCompleted ? "rgba(255, 255, 255, 0.8)" : "transparent"};
  border-radius: 50%;
  border: ${(props) =>
    props.isCompleted
      ? "1px solid rgba(255, 255, 255, 0.8)"
      : "1px solid rgba(255, 255, 255, 0.6)"};
  margin-left: 0.5em;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

export default function Task({ id, title, isCompleted, handleChange }) {
  return (
    <TaskContainer>
      <CheckboxWrapper>
        <StyledCheckbox isCompleted={isCompleted}>
          {isCompleted && (
            <span style={{ fontSize: "0.5em", color: " #222223" }}>✓</span>
          )}
        </StyledCheckbox>
        <HiddenCheckbox checked={isCompleted} onChange={handleChange(id)} />
      </CheckboxWrapper>
      <Title isCompleted={isCompleted}>{title}</Title>
    </TaskContainer>
  );
}
