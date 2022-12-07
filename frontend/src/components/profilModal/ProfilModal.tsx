import React, { useRef, useEffect, useCallback, RefObject } from 'react';
import { useSpring, animated } from 'react-spring';
import { User } from '../../types/types';

import {
  Background,
  ModalWrapper,
  ModalContent,
  CloseModalButton,
  ModalHeader,
  ModalText,
  LogoutButton,
} from './ProfilModal.styled';

interface ModalProps {
  showModal: boolean;
  setShowModal: Function;
  user: User;
  logoutHandler: Function;
}

export const Modal = ({
  showModal,
  setShowModal,
  user,
  logoutHandler,
}: ModalProps) => {
  const modalRef = useRef() as RefObject<HTMLDivElement>;

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
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

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper>
              <ModalContent>
                <ModalHeader>{user?.name}</ModalHeader>
                <ModalText>{user?.email}</ModalText>
                <LogoutButton onClick={() => logoutHandler()}>
                  Logout
                </LogoutButton>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev: boolean) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
