import React, { useEffect } from 'react';
import AuthForm from '../components/authForm/AuthForm';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const HomePage = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <HomePage>
      <TypeAnimation
        sequence={[
          'Hello, how are you?',
          3000,
          'Ciao, come stai?',
          3000,
          'Hallo, wie geht`s dir?',
          3000,
          'Hola cómo estás?',
          3000,
        ]}
        speed={40}
        style={{ fontSize: '2em', color: 'white' }}
        wrapper="span"
        repeat={2}
      />
      <AuthForm />
    </HomePage>
  );
};

export default Home;
