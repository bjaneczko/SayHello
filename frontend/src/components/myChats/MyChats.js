import axios from "axios";
import React, { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "../../config/ChatLogic";

import {
  ChatsContainer,
  Header,
  HeaderText,
  HeaderButton,
  Chats,
  ChatCard,
  ChatUser,
} from "./MyChats.styled";

const MyChats = () => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      let data;
      await axios.get("/api/chat", config).then(function (response) {
        data = response.data;
        setChats(data);
      });
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    if (user?.token) {
      fetchChats();
    }
  }, [user]);

  return (
    <ChatsContainer>
      <Header>
        <HeaderText>MyChats</HeaderText>
        <HeaderButton>Group chat</HeaderButton>
      </Header>
      <Chats>
        {chats
          ? chats.map((chat) => (
              <ChatCard
                onClick={() => setSelectedChat(chat)}
                key={chat._id}
                style={
                  chat === selectedChat
                    ? { backgroundColor: " #aac3d4" }
                    : { backgroundColor: "#dde7ee" }
                }
              >
                <ChatUser>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </ChatUser>
              </ChatCard>
            ))
          : "no chats"}
      </Chats>
    </ChatsContainer>
  );
};

export default MyChats;
