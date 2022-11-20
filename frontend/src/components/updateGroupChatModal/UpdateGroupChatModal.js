import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import React, { useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";

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
} from "./UpdateGroupChatModal.styled";

const UpdateGroupChatModal = ({
  fetchMessages,
  fetchAgain,
  setFetchAgain,
  showModal,
  setShowModal,
}) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const { selectedChat, setSelectedChat, user } = ChatState();

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
      console.log("Failed to Load the Search Results");

      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
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

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      console.log("User Already in group!");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      console.log("Only admins can add someone!");
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

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      console.log("Only admins can remove someone!");
      return;
    }

    if (selectedChat.groupAdmin._id === user._id && user1._id === user._id) {
      console.log(`You are an admin, cant leave group!`);
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

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      // fetchMessages();
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
  });

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <animated.div style={animation}>
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
        </animated.div>
      ) : null}
    </>
  );
};

export default UpdateGroupChatModal;
