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
