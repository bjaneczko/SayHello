import React, { useEffect } from "react";
import AuthForm from "../components/authForm/AuthForm";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <HomePage>
      <AuthForm />
    </HomePage>
  );
};

export default Home;
