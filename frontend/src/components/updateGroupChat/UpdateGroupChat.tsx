import React, { useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { setSelectedChat } from '../../store/chatsSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateGroupChatProps, User } from '../../types/types';

import {
  Container,
  Content,
  CloseButton,
  UserBadge,
  ResultsWrapper,
  FormInput,
  Button,
  FormWrapper,
  SearchResultContainer,
  ResultHeader,
} from './UpdateGroupChat.styled';

const UpdateGroupChatModal = ({
  fetchMessages,
  fetchAgain,
  setFetchAgain,
  showModal,
  setShowModal,
}: updateGroupChatProps) => {
  const dispatch = useAppDispatch();

  const [groupChatName, setGroupChatName] = useState('');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedChat = useAppSelector((state) => state.chats.selectedChat);
  const user = useAppSelector((state) => state.user.user);

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) {
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
      setSearchResult(data);
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

      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.patch(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.error('Can`t rename an group', {
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
    setGroupChatName('');
  };

  const handleAddUser = async (user1: User) => {
    if (selectedChat.users.find((u: User) => u._id === user1._id)) {
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

    if (selectedChat.groupAdmin._id !== user._id) {
      toast.error('Only admin can add someone!', {
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

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error(`Sorry there was an error while adding a user`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setLoading(false);
    }
    setGroupChatName('');
  };

  const handleRemove = async (user1: User) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast.error('Only admin can remove someone!', {
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

    if (selectedChat.groupAdmin._id === user._id && user1._id === user._id) {
      toast.error('You are an admin, can`t leave a group', {
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

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id
        ? dispatch(setSelectedChat(null))
        : dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error(`Sorry there was an error while removing an user`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setLoading(false);
    }
    setGroupChatName('');
  };

  const keyPress = useCallback(
    (e: { key: string }) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  //TODO add formik

  return (
    <>
      {showModal ? (
        <Container>
          <Content>
            <ResultsWrapper>
              {selectedChat.users.map((u: User) => (
                <UserBadge key={u._id} onClick={() => handleRemove(u)}>
                  {u.name} x
                </UserBadge>
              ))}
            </ResultsWrapper>
            <FormWrapper>
              <FormInput
                type="text"
                placeholder="Chat Name"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button onClick={handleRename}>Update</Button>
            </FormWrapper>
            <FormWrapper>
              <FormInput
                type="text"
                placeholder="Search for users"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormWrapper>
            <ResultsWrapper>
              {loading ? (
                <div>Loading</div>
              ) : (
                searchResult?.slice(0, 4).map((user: User) => (
                  <SearchResultContainer
                    key={user._id}
                    onClick={() => handleAddUser(user)}
                  >
                    <ResultHeader>{user.name}</ResultHeader>
                  </SearchResultContainer>
                ))
              )}
            </ResultsWrapper>
            <Button onClick={() => handleRemove(user)}>Leave group</Button>
          </Content>
          <CloseButton
            aria-label="Close update modal"
            onClick={() => setShowModal((prev: boolean) => !prev)}
          />
        </Container>
      ) : null}
    </>
  );
};

export default UpdateGroupChatModal;
