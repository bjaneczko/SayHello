import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setSelectedChat, clearNotification } from '../../store/chatsSlice';
import { GoPerson } from 'react-icons/go';
import { MdNotifications } from 'react-icons/md';
import { Modal } from '../profilModal/ProfilModal';

import {
  NavbarContainer,
  InformationContainer,
  InformationModal,
  LogoContainer,
  NotificationBadge,
  NotificationCount,
  NotificationText,
} from './Navbar.styled';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showNotification, setNotification] = useState(false);

  const openModal = (): void => {
    setShowModal((prev) => !prev);
  };

  const openNotificationModal = (): void => {
    setNotification((prev) => !prev);
  };

  const logoutHandler = (): void => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const user = useAppSelector((state) => state.user.user);
  const notification = useAppSelector((state) => state.chats.notification);

  const calcNorificationLength = (length: number) => {
    if (length < 99) {
      return length;
    } else {
      return '+99';
    }
  };

  return (
    <>
      <NavbarContainer>
        <LogoContainer>
          Say<span style={{ backgroundColor: '#00adb5' }}>Hello</span>
        </LogoContainer>
        <InformationContainer>
          {showNotification && notification.length > 0 && (
            <NotificationText
              onClick={() => {
                openNotificationModal();
                dispatch(setSelectedChat(notification[0].chat));
                dispatch(clearNotification());
              }}
            >
              Message from {notification[0].sender.name}
            </NotificationText>
          )}
          <InformationModal onClick={openNotificationModal}>
            <MdNotifications />
            {notification?.length > 0 && (
              <NotificationBadge>
                <NotificationCount>
                  {calcNorificationLength(notification.length)}
                </NotificationCount>
              </NotificationBadge>
            )}
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
