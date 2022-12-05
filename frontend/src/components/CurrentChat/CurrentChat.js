import React from 'react';
import { useSelector } from 'react-redux';
import SingleChat from '../singleChat/SingleChat';

import { CurrentChatContainer } from './CurrentChat.styled';

const CurrentChat = ({ fetchAgain, setFetchAgain }) => {
  const selectedChat = useSelector((state) => state.chats.selectedChat);

  return (
    <CurrentChatContainer selectedChat={selectedChat}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </CurrentChatContainer>
  );
};

export default CurrentChat;
