import React, { useState } from "react";
import styled from "@emotion/styled";
import Navbar from "../components/navbar/Navbar";
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
  height: calc(100% - 100px);
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const ChatPage = () => {
  const user = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <PageContainer>
      {user && <Navbar />}
      <ChatsContainer>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <CurrentChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </ChatsContainer>
    </PageContainer>
  );
};

export default ChatPage;
