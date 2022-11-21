import axios from "axios";
import React, { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "../../config/ChatLogic";
import GroupChatModal from "../groupChatModal/GroupChatModal";

import {
  ChatsContainer,
  Header,
  HeaderText,
  HeaderButton,
  Chats,
  ChatCard,
  ChatUser,
} from "./ChatsList.styled";

const ChatsList = ({ fetchAgain }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

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
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    if (user?.token) {
      fetchChats();
    }
  }, [fetchAgain, user]);

  return (
    <>
      <ChatsContainer selectedChat={selectedChat}>
        <Header>
          <HeaderText>MyChats</HeaderText>
          <HeaderButton onClick={openModal}>Group chat</HeaderButton>
        </Header>
        <Chats>
          {chats
            ? chats.map((chat) => (
                <ChatCard
                  onClick={() => setSelectedChat(chat)}
                  key={chat._id}
                  isSelected={chat === selectedChat}
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
      <GroupChatModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default ChatsList;
