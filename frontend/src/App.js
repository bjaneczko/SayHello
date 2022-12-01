import React from 'react';
import { Global, css } from '@emotion/react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import styled from '@emotion/styled';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: #0e141b;
`;

const App = () => {
  return (
    <AppContainer>
      <Global
        styles={css`
          body {
            font-family: 'Roboto', sans-serif;
            padding: 0;
            margin: 0;
            width: 100vw;
            height: 100vh;
          }
          ::selection {
            background: #00adb5;
          }
        `}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
