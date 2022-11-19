import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { MdNotifications } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import Sidebar from "../sidebar/Sidebar";
import { Modal } from "../modal/Modal";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";

import {
  NavbarContainer,
  NewChatButton,
  IconContainer,
  InformationContainer,
  InformationModal,
} from "./Navbar.styled";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const openSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      console.log("Provide name or smth");
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
      console.log(data);
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      console.log("Failed to Load the Search Results");
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

      setSelectedChat(data);
      setLoadingChat(false);
      console.log("Success");
    } catch (error) {
      console.log(error.message);
      console.log("Fail");
    }
  };

  return (
    <>
      <NavbarContainer>
        <NewChatButton onClick={openSidebar}>
          <IconContainer>
            <SiAddthis />
          </IconContainer>
          New message
        </NewChatButton>
        <InformationContainer>
          <InformationModal>
            <MdNotifications />
          </InformationModal>
          <InformationModal onClick={openModal}>
            <GoPerson />
          </InformationModal>
        </InformationContainer>
      </NavbarContainer>
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setSearch={setSearch}
        search={search}
        handleSearch={handleSearch}
        loading={loading}
        searchResults={searchResults}
        accessChat={accessChat}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
        logoutHandler={logoutHandler}
      />
    </>
  );
};

export default Navbar;
