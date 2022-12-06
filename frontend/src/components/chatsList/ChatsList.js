import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedChat, setChats } from '../../store/chatsSlice';
import { getSender } from '../../config/ChatLogic';
import axios from 'axios';
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
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupChatName, setGroupChatName] = useState();

  const [loading, setLoading] = useState(false);

  const [loadingChat, setLoadingChat] = useState();
  const [showModal, setShowModal] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();

  const openSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const user = useSelector((state) => state.user.user);
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const chats = useSelector((state) => state.chats.chats);
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
        dispatch(setChats(data));
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    if (user.token) {
      fetchChats();
    }
  }, [fetchAgain, user]);

  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => {
      clearTimeout(delay);
    };
  }, [search]);

  const handleSearch = async () => {
    if (search.length === 0) {
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

  const handleSubmit = async () => {
    if (selectedUsers.length < 1) {
      console.log('Choose at least 1 user!');
      return;
    }

    if (selectedUsers.length >= 2 && !groupChatName) {
      console.log('Please provide chat name');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      if (selectedUsers.length < 2) {
        const userId = selectedUsers[0]._id;
        const { data } = await axios.post(`/api/chat`, { userId }, config);

        if (!chats?.find((c) => c._id === data._id)) {
          dispatch(setChats([data, ...chats]));
        }
        dispatch(setSelectedChat(data));
        setLoadingChat(false);
        setShowSearch(false);
        setSearch('');
        setSelectedUsers([]);
      } else {
        const { data } = await axios.post(
          `/api/chat/group`,
          {
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map((u) => u._id)),
          },
          config
        );
        dispatch(setChats([data, ...chats]));
        dispatch(setSelectedChat(data));
        setSearch('');
        setShowSearch(false);
        setSelectedUsers([]);
      }
    } catch (error) {
      console.log(`Failed to Create the Chat!`);
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
          </div>
        </Header>
        <Chats>
          {chats && !showSearch ? (
            chats.map((chat) => (
              <ChatCard
                onClick={() => dispatch(setSelectedChat(chat))}
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
              groupChatName={groupChatName}
              setGroupChatName={setGroupChatName}
              setSearch={setSearch}
              search={search}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              handleSearch={handleSearch}
              loading={loading}
              searchResults={searchResults}
              handleSubmit={handleSubmit}
            />
          )}
        </Chats>
      </ChatsContainer>
    </>
  );
};

export default ChatsList;
