import styled from "@emotion/styled";
import { MdClose } from "react-icons/md";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

export const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  padding: 5rem 6rem;
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

export const UserAvatar = styled.div`
  width: 100px;
  height: 100px;
  background: url("/avatar.png");
  background-size: cover;
  border-radius: 100%;
`;

export const ModalHeader = styled.div`
  font-size: 28px;
  font-weight: 600;
`;

export const ModalText = styled.div`
  font-size: 16px;
  margin-bottom: 40px;
`;

export const LogoutButton = styled.button`
  background-color: #0083b0;
  border-radius: 30px;
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
    background-color: #007399;
  }
`;
