import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import SingleChat from '../singleChat/SingleChat';

import { CurrentChatContainer } from './CurrentChat.styled';

interface CurrentChatProps {
  fetchAgain: boolean;
  setFetchAgain: Function;
}

const CurrentChat = ({ fetchAgain, setFetchAgain }: CurrentChatProps) => {
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);

  return (
    <CurrentChatContainer selectedChat={selectedChat}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </CurrentChatContainer>
  );
};

export default CurrentChat;
