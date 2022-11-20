import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "../../config/ChatLogic";
import { FaArrowLeft, FaEye, FaPen } from "react-icons/fa";

import {
  ChatHeader,
  InfomationContainer,
  InformationText,
  ChatButton,
  MessagesContainer,
} from "./SingleChat.styled";
import UpdateGroupChatModal from "../updateGroupChatModal/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <UpdateGroupChatModal
            showModal={showModal}
            setShowModal={setShowModal}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          />
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
              <>
                <p>{selectedChat.chatName}</p>
                <ChatButton onClick={openModal}>
                  <FaPen />
                </ChatButton>
              </>
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
