import React from "react";
import AuthForm from "../components/authForm/AuthForm";
import styled from "@emotion/styled";

const HomePage = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TestUserButton = styled.button`
  padding-top: 20px;
  color: white;
  background: none;
  border: none;
  border-bottom: 2px solid white;
  font-family: inherit;
  font-size: inherit;

  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
  }
`;

const Home = () => {
  return (
    <HomePage>
      <AuthForm />
    </HomePage>
  );
};

export default Home;
