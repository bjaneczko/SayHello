import React from 'react';
import { useSelector } from 'react-redux';
import { isSameSenderMargin } from '../../config/ChatLogic';

import { ChatContainer, Message } from './ScrollableChat.styled';

const ScrollableChat = ({ messages }) => {
  const user = useSelector((state) => state.user.user);

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
