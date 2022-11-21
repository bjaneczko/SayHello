import React from "react";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "../singleChat/SingleChat";

import { CurrentChatContainer } from "./CurrentChat.styled";

const CurrentChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <CurrentChatContainer selectedChat={selectedChat}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </CurrentChatContainer>
  );
};

export default CurrentChat;
