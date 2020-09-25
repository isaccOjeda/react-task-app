import React from "react";
import TaskList from "./components/TaskList";
import styled from "styled-components";

const MainApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #121212;
  height: 100vh;
  padding: 0 1em;
`;
function App() {
  return (
    <MainApp>
      <TaskList />
    </MainApp>
  );
}

export default App;
