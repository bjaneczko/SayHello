import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedChat } from '../../store/chatsSlice';
import React, { useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { toast } from 'react-toastify';

import {
  ModalContainer,
  ModalContent,
  CloseModalButton,
  UserBadge,
  ResultsWrapper,
  FormInput,
  Button,
  FormWrapper,
  SearchResultContainer,
  ResultHeader,
} from './UpdateGroupChatModal.styled';

const UpdateGroupChatModal = ({
  fetchMessages,
  fetchAgain,
  setFetchAgain,
  showModal,
  setShowModal,
}) => {
  const dispatch = useDispatch();

  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const user = useSelector((state) => state.user.user);

  const handleSearch = async (query) => {
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
      toast.error(error.response.data.message, {
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

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
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
      toast.error(error.response.data.message, {
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

  const handleRemove = async (user1) => {
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
        ? dispatch(setSelectedChat())
        : dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, {
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
    (e) => {
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
        <ModalContainer showModal={showModal}>
          <ModalContent>
            <ResultsWrapper>
              {selectedChat.users.map((u) => (
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
                searchResult?.slice(0, 4).map((user) => (
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
          </ModalContent>
          <CloseModalButton
            aria-label="Close modal"
            onClick={() => setShowModal((prev) => !prev)}
          />
        </ModalContainer>
      ) : null}
    </>
  );
};

export default UpdateGroupChatModal;
