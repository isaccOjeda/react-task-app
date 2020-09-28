import React from "react";
import styled from "styled-components";
import { ReactComponent as MoreHoriz } from "../icons/more_horiz.svg";

const TaskContainer = styled.div`
  width: 99%;
  min-height: 4rem;
  height: auto;
  display: flex;
  margin-bottom: 0.8rem;
  background-color: #fff;
  border: 1.2px solid #e2e6ee;
  border-radius: 10px;
`;

const Title = styled.p`
  font-family: Montserrat;
  font-weight: 500;
  font-size: 0.7rem;
  margin: auto;
  width: 65%;
  color: #000;
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
  height: 0.8rem;
  width: 0.8rem;
  background-color: ${(props) =>
    props.completed ? props.main_color : "transparent"};
  border-radius: 25%;
  border: 1px solid ${(props) => props.main_color};
  margin-left: 0.8rem;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const EditButton = styled.button`
  width: 20%;
  border: none;
  background-color: transparent;
  color: #bb86fc;
  font-family: Montserrat;
  font-size: 0.6rem;
`;

const Checkmark = styled.span`
  font-size: 0.5rem;
  color: #fff;
`;

export default function Task({ task, handleChange, onEditClick, category }) {
  const { completed, title, _id } = task;

  const renderTitle = (title) => {
    if (title.length >= 40) {
      return title.slice(0, 37) + "...";
    }
    return title;
  };
  return (
    <TaskContainer completed={completed} main_color={category.main_color}>
      <CheckboxWrapper>
        <StyledCheckbox completed={completed} main_color={category.main_color}>
          {completed && <Checkmark>✓</Checkmark>}
        </StyledCheckbox>
        <HiddenCheckbox checked={completed} onChange={handleChange(_id)} />
      </CheckboxWrapper>
      <Title completed={completed}>{renderTitle(title)}</Title>
      <EditButton onClick={() => onEditClick(task)}>
        <MoreHoriz
          style={{
            fill: `${category.main_color}`,
            cursor: "pointer",
          }}
        />
      </EditButton>
    </TaskContainer>
  );
}
