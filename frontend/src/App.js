import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Routing from "./components/Routing/Routing";
import styled from "@emotion/styled";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: "Roboto", sans-serif;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(to right, #0083b0, #00b4db);
`;

const App = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <Router>
        <Routing />
      </Router>
    </AppContainer>
  );
};

export default App;
