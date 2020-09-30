import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Navbar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 20%;
  background-color: #1d1e1f;
`;

const NavHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
  width: 100%;
`;
const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  align-items: center;
`;
const NavFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
`;

const NavItem = styled.div`
  height: 1.8rem;
  width: 1.8rem;
  background-color: ${(props) =>
    props.isSelected ? props.main_color : "#353943"};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25%;
  cursor: pointer;
  -webkit-box-shadow: 0px 1.8px 0px 1px
    ${(props) => (props.isSelected ? props.dark_color : "#000000")};
  box-shadow: 0px 1.8px 0px 1px
    ${(props) => (props.isSelected ? props.dark_color : "#000000")};
`;

const Text = styled.p`
  font-family: Montserrat;
  font-size: 0.6em;
  font-weight: bold;
  color: ${(props) => (props.isSelected ? "#fff" : props.main_color)};
`;

export default function CategoryNavbar({ selectCategory, categorySelected }) {
  const [isLoading, setisLoading] = useState(true);
  const [categoryList, setcategoryList] = useState([]);

  useEffect(() => {
    axios
      .get(`/categories/`)
      .then(function (response) {
        // handle success
        setcategoryList(response.data);
        selectCategory(response.data[0]);
        setisLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [selectCategory]);

  if (isLoading) {
    return <Navbar />;
  }

  return (
    <Navbar>
      <NavHeaderContainer />
      <NavItemsContainer>
        {categoryList.map((category) => (
          <NavItem
            main_color={category.main_color}
            dark_color={category.dark_color}
            isSelected={categorySelected._id === category._id}
            key={category._id}
            onClick={() => selectCategory(category)}
          >
            <Text
              main_color={category.main_color}
              isSelected={categorySelected._id === category._id}
            >
              {category.name.slice(0, 1).toUpperCase()}
            </Text>
          </NavItem>
        ))}
      </NavItemsContainer>
      <NavFooterContainer />
    </Navbar>
  );
}
