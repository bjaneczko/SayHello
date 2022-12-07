import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isSameSenderMargin } from '../../utils/getUserInfo';
import 'scrollable-component';

import { ChatContainer, Message } from './ScrollableChat.styled';

const ScrollableChat = ({ messages }) => {
  const user = useSelector((state) => state.user.user);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <scrollable-component>
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
        <div ref={messagesEndRef} />
      </ChatContainer>
    </scrollable-component>
  );
};

export default ScrollableChat;
