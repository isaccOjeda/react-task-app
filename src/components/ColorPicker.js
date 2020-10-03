import React from "react";
import styled from "styled-components";

const colors = [
  {
    main_color: "#A362EA",
    dark_color: "#502583",
    light_color: "#F5EEFD",
  },
  {
    main_color: "#F5A921",
    dark_color: "#BD7900",
    light_color: "#FEF5E6",
  },
  {
    main_color: "#43C8DD",
    dark_color: "#078A9F",
    light_color: "#E8F8FB",
  },
  {
    main_color: "#F55C33",
    dark_color: "#C32900",
    light_color: "#FEF0ED",
  },
];

const MainContainer = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.8rem;
  padding: 1rem 1rem;
  border-radius: 15px;
  margin-bottom: 3rem;
  background-color: #353943;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
`;

const ColorItem = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 2rem;
  width: 2em;
  background-color: ${(props) => props.main_color};
  border: ${(props) => (props.isSelected ? "2px solid #fff" : "none")};
  margin: 0 0.2rem;
  cursor: pointer;
`;

const SelectedMark = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 0.6rem;
  width: 0.6em;
`;

const Checkmark = styled.span`
  font-size: 0.5rem;
  color: ${(props) => props.main_color};
`;

export default function ColorPicker({ handleColorChange, values }) {
  return (
    <MainContainer>
      {colors.map((color, index) => (
        <ColorItem
          onClick={() => handleColorChange(color)}
          key={index}
          main_color={color.main_color}
          isSelected={color.main_color === values.main_color}
        >
          {color.main_color === values.main_color && (
            <SelectedMark>
              <Checkmark main_color={color.main_color}>✓</Checkmark>
            </SelectedMark>
          )}
        </ColorItem>
      ))}
    </MainContainer>
  );
}
