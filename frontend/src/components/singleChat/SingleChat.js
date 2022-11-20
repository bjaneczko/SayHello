import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "../../config/ChatLogic";
import { FaArrowLeft } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import {
  ChatHeader,
  InfomationContainer,
  InformationText,
  ChatButton,
  MessagesContainer,
} from "./SingleChat.styled";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  return (
    <>
      {selectedChat ? (
        <>
          <ChatHeader>
            <ChatButton hideOnMobile={true} onClick={() => setSelectedChat("")}>
              <FaArrowLeft />
            </ChatButton>

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ChatButton onClick={() => console.log("Modal opened")}>
                  <FaEye />
                </ChatButton>
              </>
            ) : (
              <p>{selectedChat.chatName}</p>
            )}
          </ChatHeader>
          <MessagesContainer>heh</MessagesContainer>
        </>
      ) : (
        <InfomationContainer>
          <InformationText>Nothing here..</InformationText>
          <InformationText>
            Choose existing chat or send new message
          </InformationText>
        </InfomationContainer>
      )}
    </>
  );
};

export default SingleChat;
