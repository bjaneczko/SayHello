import React from "react";
import styled from "@emotion/styled";
import Sidebar from "../components/sidebar/Sidebar";
import MyChats from "../components/myChats/MyChats";
import CurrentChat from "../components/CurrentChat/CurrentChat";
import { ChatState } from "../context/ChatProvider";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ChatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const ChatPage = () => {
  const user = ChatState();
  console.log(user);

  return (
    <PageContainer>
      {user && <Sidebar />}
      <ChatsContainer>
        {user && <MyChats />}
        {user && <CurrentChat />}
      </ChatsContainer>
    </PageContainer>
  );
};

export default ChatPage;
