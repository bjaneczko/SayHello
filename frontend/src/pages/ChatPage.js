import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Navbar from '../components/navbar/Navbar';
import ChatsList from '../components/chatsList/ChatsList';
import CurrentChat from '../components/currentChat/CurrentChat';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ChatsContainer = styled.div`
  height: calc(100% - 100px);
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const ChatPage = () => {
  const user = useSelector((state) => state.user.user);

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
