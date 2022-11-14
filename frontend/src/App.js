import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Routing from "./components/Routing/Routing";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: "Roboto", sans-serif;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routing />
      </Router>
    </>
  );
};

export default App;
