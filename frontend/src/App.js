import React, { useEffect } from 'react';
import { Global, css } from '@emotion/react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import styled from '@emotion/styled';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: #0e141b;
`;

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    dispatch(setUser(userInfo));

    if (!userInfo) navigate('/');
    if (userInfo) navigate('/chats');
  }, [navigate]);

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
