import React, { useState } from 'react';
import styled from '@emotion/styled';
import Navbar from '../components/navbar/Navbar';
import ChatsList from '../components/chatsList/ChatsList';
import CurrentChat from '../components/CurrentChat/CurrentChat';
import { useAppSelector } from '../hooks/reduxHooks';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatsContainer = styled.div`
  @media (max-width: 760px) {
    padding: 0;
  }
  height: calc(100% - 110px);
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const ChatPage = () => {
  const user = useAppSelector((state) => state.user.user);

  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <PageContainer>
      {user && <Navbar />}
      <ChatsContainer>
        {user && <ChatsList fetchAgain={fetchAgain} />}
        {user && (
          <CurrentChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </ChatsContainer>
    </PageContainer>
  );
};

export default ChatPage;
