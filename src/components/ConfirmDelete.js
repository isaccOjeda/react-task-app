import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  font-family: Montserrat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const PopUp = styled.div`
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 20%;
  width: 75%;
  background-color: #fff;
  padding: 1.5rem 1rem 1rem 1rem;
`;

const Title = styled.h6`
  font-family: Montserrat;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 50%;
`;

const ButonsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 50%;
`;

const ConfirmButton = styled.button`
  font-family: Montserrat;
  width: 50%;
  background-color: #000;
  height: 75%;
  color: white;
  font-size: 0.7rem;
`;

export default function ConfirmDelete({ handleClose, task, handleConfirm }) {
  return (
    <Overlay>
      <PopUp>
        <TitleContainer>
          <Title>Are you sure you want to delete this task?</Title>
        </TitleContainer>
        <ButonsContainer>
          <ConfirmButton onClick={() => handleClose()}>Discard</ConfirmButton>
          <ConfirmButton onClick={() => handleConfirm(task._id)}>
            Confirm
          </ConfirmButton>
        </ButonsContainer>
      </PopUp>
    </Overlay>
  );
}
