import React, { useState, useCallback } from "react";
import TaskList from "./TaskList";
import styled from "styled-components";
import CategoryNavbar from "./CategoryNavbar";

const MainWrapper = styled.div`
  min-height: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

export default function Dashboard() {
  const [categorySelected, setcategorySelected] = useState({});

  const memoizedSelectCategory = useCallback((category) => {
    setcategorySelected(category);
  }, []);

  return (
    <MainWrapper>
      <TaskList category={categorySelected} />

      <CategoryNavbar
        selectCategory={memoizedSelectCategory}
        categorySelected={categorySelected}
      />
    </MainWrapper>
  );
}
