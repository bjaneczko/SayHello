import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChatState } from '../../context/ChatProvider';
import { getSender } from '../../config/ChatLogic';
import axios from 'axios';
import GroupChatModal from '../groupChatModal/GroupChatModal';
import Search from '../search/Search';

import {
  ChatsContainer,
  Header,
  HeaderText,
  Button,
  Chats,
  ChatCard,
} from './ChatsList.styled';

const ChatsList = ({ fetchAgain }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [showModal, setShowModal] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const openSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  const user = useSelector((state) => state.user.user);

  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      let data;
      await axios.get('/api/chat', config).then(function (response) {
        data = response.data;
        setChats(data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    if (user?.token) {
      fetchChats();
    }
  }, [fetchAgain, user]);

  const handleSearch = async () => {
    if (!search) {
      console.log('Provide name or smth');
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      console.log('Failed to Load the Search Results');
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats?.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      console.log('Success');
    } catch (error) {
      console.log(error.message);
      console.log('Fail');
    }
  };

  return (
    <>
      <ChatsContainer selectedChat={selectedChat}>
        <Header>
          <HeaderText>Chats</HeaderText>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button onClick={openSearch}>
              {showSearch ? 'All chats' : 'New chat'}
            </Button>
            {/* <Button onClick={openModal}>Group chat</Button> */}
          </div>
        </Header>
        <Chats>
          <GroupChatModal showModal={showModal} setShowModal={setShowModal} />
          {chats && !showSearch ? (
            chats.map((chat) => (
              <ChatCard
                onClick={() => setSelectedChat(chat)}
                key={chat._id}
                isSelected={chat === selectedChat}
              >
                <p>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </p>
              </ChatCard>
            ))
          ) : (
            <Search
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              setSearch={setSearch}
              search={search}
              handleSearch={handleSearch}
              loading={loading}
              searchResults={searchResults}
              accessChat={accessChat}
            />
          )}
        </Chats>
      </ChatsContainer>
    </>
  );
};

export default ChatsList;
