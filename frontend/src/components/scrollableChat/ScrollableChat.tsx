import React, { useRef, useEffect } from 'react';
import { ChatContainer, Message } from './ScrollableChat.styled';
import { Message as MessageType } from '../../types/types';
import { useAppSelector } from '../../hooks/typedReduxHooks';

interface ScrollableChatProps {
  messages: MessageType[];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['scrollable-component']: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const ScrollableChat = ({ messages }: ScrollableChatProps) => {
  const user = useAppSelector((state) => state.user.user);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
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
          <Message key={m._id} isSender={m.sender._id === user._id}>
            {m.content}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </ChatContainer>
    </scrollable-component>
  );
};

export default ScrollableChat;
