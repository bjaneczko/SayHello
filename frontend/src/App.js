import React from "react";
import { Global, css } from "@emotion/react";
import Routing from "./components/routing/Routing";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(to right, #0083b0, #00b4db);
`;

const App = () => {
  return (
    <AppContainer>
      <Global
        styles={css`
          body {
            font-family: "Roboto", sans-serif;
            padding: 0;
            margin: 0;
            width: 100vw;
            height: 100vh;
          }
        `}
      />
      <Routing />
    </AppContainer>
  );
};

export default App;
