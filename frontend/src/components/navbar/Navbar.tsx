import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/reducerHooks';
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

  const user = useAppSelector((state) => state.user.user);

  return (
    <>
      <NavbarContainer>
        <LogoContainer>
          Say<span style={{ backgroundColor: '#00adb5' }}>Hello</span>
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
