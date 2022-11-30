import React, { useState } from 'react';
import { GoPerson } from 'react-icons/go';
import { MdNotifications } from 'react-icons/md';
import { ChatState } from '../../context/ChatProvider';
import { Modal } from '../profilModal/ProfilModal';

import {
  NavbarContainer,
  InformationContainer,
  InformationModal,
  LogoContainer,
} from './Navbar.styled';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const { user } = ChatState();

  return (
    <>
      <NavbarContainer>
        <LogoContainer>
          <img
            style={{ width: '50px' }}
            src="/logo192.png"
            alt="SayHello logo"
          />
        </LogoContainer>
        <InformationContainer>
          <InformationModal>
            <MdNotifications />
          </InformationModal>
          <InformationModal onClick={openModal}>
            <GoPerson />
          </InformationModal>
        </InformationContainer>
      </NavbarContainer>
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
