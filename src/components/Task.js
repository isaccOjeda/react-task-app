import React, { useState } from "react";
import styled from "styled-components";
import useLongPress from "../hooks/useLongPress";
import { ReactComponent as EditIcon } from "../icons/edit_icon.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete_icon.svg";

const TaskContainer = styled.div`
  width: 99%;
  min-height: 4rem;
  height: auto;
  display: flex;
  margin-bottom: 0.8rem;
  transition: background 0.1s ease;
  background-color: ${(props) => (props.selected ? props.main_color : "#fff")};

  border: 1.2px solid #e2e6ee;
  border-radius: 10px;
`;

const Title = styled.p`
  font-family: Montserrat;
  font-weight: 500;
  font-size: 0.7rem;
  margin: auto;
  width: 55%;
  color: ${(props) => (props.selected ? "#fff" : "#000")};
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
    props.completed ? (props.selected ? "#fff" : props.main_color) : "#fff"};
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
  color: ${(props) => (props.selected ? props.main_color : "#fff")};
`;

const MenuContainer = styled.div`
  display: ${(props) => (props.selected ? "flex" : "hidden")};
  width: 30%;
  justify-content: space-evenly;
`;

export default function Task({
  task,
  handleChange,
  openEditForm,
  handleDelete,
  task_list,
}) {
  const [selected, setselected] = useState(false);
  const { completed, title } = task;

  const onLongPress = () => {
    setselected(!selected);
  };

  const onTaskClick = (task) => {
    return;
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const longPressEvent = useLongPress(
    onLongPress,
    onTaskClick,
    defaultOptions,
    task
  );

  const renderTitle = (title) => {
    if (title.length >= 40) {
      return title.slice(0, 37) + "...";
    }
    return title;
  };
  return (
    <TaskContainer
      completed={completed}
      main_color={task_list.main_color}
      {...longPressEvent}
      selected={selected}
    >
      <CheckboxWrapper>
        <StyledCheckbox
          selected={selected}
          completed={completed}
          main_color={task_list.main_color}
        >
          {completed && (
            <Checkmark main_color={task_list.main_color} selected={selected}>
              ✓
            </Checkmark>
          )}
        </StyledCheckbox>
        <HiddenCheckbox checked={completed} onChange={handleChange(task._id)} />
      </CheckboxWrapper>
      <Title selected={selected} completed={completed}>
        {renderTitle(title)}
      </Title>
      <MenuContainer selected={selected}>
        <EditButton onClick={() => openEditForm(task)}>
          <EditIcon
            style={{
              fill: `${selected ? "#fff" : "transparent"}`,
              cursor: "pointer",
              width: "1rem",
            }}
          />
        </EditButton>
        <EditButton onClick={() => handleDelete(task)}>
          <DeleteIcon
            style={{
              fill: `${selected ? "#fff" : "transparent"}`,
              cursor: "pointer",
              width: "1rem",
            }}
          />
        </EditButton>
      </MenuContainer>
    </TaskContainer>
  );
}
