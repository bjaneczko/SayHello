import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { getSender } from "../../config/ChatLogic";
import { FaArrowLeft, FaEye, FaPen } from "react-icons/fa";
import ScrollableChat from "../scrollableChat/ScrollableChat";
import UpdateGroupChatModal from "../updateGroupChatModal/UpdateGroupChatModal";

import {
  ChatHeader,
  InfomationContainer,
  InformationText,
  ChatButton,
  MessagesContainer,
  FormWrapper,
  FormInput,
} from "./SingleChat.styled";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      //   socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(`Failed to Load the Messages`);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      //   socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        // socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log("Failed to send the Message");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // if (!socketConnected) return;

    // if (!typing) {
    //   setTyping(true);
    //   socket.emit("typing", selectedChat._id);
    // }
    // let lastTypingTime = new Date().getTime();
    // var timerLength = 3000;
    // setTimeout(() => {
    //   var timeNow = new Date().getTime();
    //   var timeDiff = timeNow - lastTypingTime;
    //   if (timeDiff >= timerLength && typing) {
    //     socket.emit("stop typing", selectedChat._id);
    //     setTyping(false);
    //   }
    // }, timerLength);
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
            fetchMessages={fetchMessages}
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

          <MessagesContainer>
            {loading ? (
              <p>Loading</p>
            ) : (
              <>
                <ScrollableChat messages={messages} />
              </>
            )}
            <FormWrapper onKeyDown={sendMessage}>
              <FormInput
                type="text"
                placeholder="Chat Name"
                onChange={typingHandler}
                value={newMessage}
              />
            </FormWrapper>
          </MessagesContainer>
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
