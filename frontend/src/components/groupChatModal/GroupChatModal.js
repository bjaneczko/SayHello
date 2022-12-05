import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '../../store/chatsSlice';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';

import {
  Background,
  ModalWrapper,
  ModalContent,
  CloseModalButton,
  ModalHeader,
  FormInput,
  CreateButton,
  SearchResultContainer,
  ResultHeader,
  ResultsWrapper,
  UserBadge,
} from './GroupChatModal.styled';

const GroupChatModal = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

  const chats = useSelector((state) => state.chats.chats);

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
      console.log(`Error occupied`);
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      console.log('Please fill all the feilds');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      dispatch(setChats([data, ...chats]));

      setShowModal((prev) => !prev);
    } catch (error) {
      console.log(`Failed to Create the Chat!`);
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log(`User already added`);
      return;
    }
    console.log(`user aded`);
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <ModalHeader>Group chat</ModalHeader>
                <FormInput
                  type="text"
                  placeholder="Chat Name"
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <FormInput
                  type="text"
                  placeholder="Search for users"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <ResultsWrapper>
                  {selectedUsers.map((user) => (
                    <UserBadge
                      key={user._id}
                      onClick={() => handleDelete(user)}
                    >
                      {user.name} x
                    </UserBadge>
                  ))}
                </ResultsWrapper>
                <ResultsWrapper>
                  {loading ? (
                    <div>Loading</div>
                  ) : (
                    searchResult?.slice(0, 4).map((user) => (
                      <SearchResultContainer
                        key={user._id}
                        onClick={() => handleGroup(user)}
                      >
                        <ResultHeader>{user.name}</ResultHeader>
                      </SearchResultContainer>
                    ))
                  )}
                </ResultsWrapper>

                <CreateButton onClick={handleSubmit}>Create</CreateButton>
              </ModalContent>
              <CloseModalButton
                aria-label="Create Group Chat"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

export default GroupChatModal;
