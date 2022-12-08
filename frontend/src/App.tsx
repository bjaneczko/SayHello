import React, { useEffect } from 'react';
import { Global, css } from '@emotion/react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';
import Home from './pages/Home';
import ChatPage from './pages/Chat';
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: #0e141b;
`;

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    let parsedUser;
    if (typeof userInfo === 'string') {
      parsedUser = JSON.parse(userInfo);
      dispatch(setUser(parsedUser));
      navigate('/chats');
    } else {
      navigate('/');
    }
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AppContainer>
  );
};

export default App;
