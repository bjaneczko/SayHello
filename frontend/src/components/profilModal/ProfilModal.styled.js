import styled from '@emotion/styled';
import { MdClose } from 'react-icons/md';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 65px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  background: #0e1d29;
  color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 1rem;
  border: 5px solid #1c2a34;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  padding: 3rem 5rem;
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const ModalHeader = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

export const ModalText = styled.div`
  font-size: 16px;
  margin-bottom: 2rem;
`;

export const LogoutButton = styled.button`
  background-color: #00adb5;
  border-radius: 1rem;
  border: none;
  text-align: center;
  font-size: 1rem;
  color: white;
  padding: 16px 40px;
  z-index: 1;

  &:focus,
  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: #009199;
  }
`;
