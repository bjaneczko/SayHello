import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { setSelectedChat, setChats } from '../../store/chatsSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getSender } from '../../utils/getUserInfo';
import Search from '../search/Search';
import { User, Chat } from '../../types/types';

import {
  ChatsContainer,
  Header,
  HeaderText,
  Button,
  Chats,
  ChatCard,
} from './ChatsList.styled';

const ChatsList = ({ fetchAgain }: { fetchAgain: boolean }) => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupChatName, setGroupChatName] = useState();
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const openSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const user = useAppSelector((state) => state.user.user);
  const selectedChat = useAppSelector((state) => state.chats.selectedChat);
  const chats = useAppSelector((state) => state.chats.chats);

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
      toast.error('Can`t fetch chats', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  useEffect(() => {
    fetchChats();
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
      toast.error('Failed to load search results', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
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

        if (!chats?.find((c: Chat) => c._id === data._id)) {
          dispatch(setChats([data, ...chats]));
        }
        dispatch(setSelectedChat(data));
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
      toast.error('Failed to create new chat!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  const handleGroup = (userToAdd: User) => {
    if (selectedUsers?.includes(userToAdd)) {
      toast.warn('User already added', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser: User) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <>
      <ChatsContainer selectedChat={selectedChat}>
        <Header>
          <HeaderText>Chats</HeaderText>
          <div style={{ display: 'flex', gap: '1 0px' }}>
            <Button onClick={openSearch}>
              {showSearch ? 'All chats' : 'New chat'}
            </Button>
          </div>
        </Header>
        <Chats>
          {chats && !showSearch ? (
            chats.map((chat: Chat) => (
              <ChatCard
                onClick={() => dispatch(setSelectedChat(chat))}
                key={chat._id}
                isSelected={chat === selectedChat}
              >
                <p>
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </p>
              </ChatCard>
            ))
          ) : (
            <Search
              showSearch={showSearch}
              search={search}
              setSearch={setSearch}
              loading={loading}
              searchResults={searchResults}
              handleSubmit={handleSubmit}
              selectedUsers={selectedUsers}
              setGroupChatName={setGroupChatName}
              handleGroup={handleGroup}
              handleDelete={handleDelete}
            />
          )}
        </Chats>
      </ChatsContainer>
    </>
  );
};

export default ChatsList;
