import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { isSameSender, isSameSenderMargin } from "../../config/ChatLogic";

import { ChatContainer, Message } from "./ScrollableChat.styled";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ChatContainer>
      {messages.map((m, i) => (
        <Message
          key={m._id}
          isSender={m.sender._id === user._id}
          isSameSenderMargin={isSameSenderMargin(messages, m, i.user_id)}
        >
          {m.content}
        </Message>
      ))}
    </ChatContainer>
  );
};

export default ScrollableChat;
