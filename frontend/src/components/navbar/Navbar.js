import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { GoPerson } from 'react-icons/go';
import { MdNotifications } from 'react-icons/md';
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

  const user = useSelector((state) => state.user.user);

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
