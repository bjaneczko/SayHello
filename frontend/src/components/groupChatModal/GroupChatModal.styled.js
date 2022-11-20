import styled from "@emotion/styled";
import { MdClose } from "react-icons/md";

export const Background = styled.div`
  margin: -80px 0 0 -20px;
  width: 100vw;
  height: 100%;
  position: absolute;
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
  padding: 3rem 3rem 3rem;
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

export const FormInput = styled.input`
  width: 244px;
  background-color: rgb(245, 248, 250);
  border: 1px solid transparent;
  border-radius: 30px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;

  &:focus,
  &:active {
    box-shadow: none;
    outline: none;
  }
`;

export const CreateButton = styled.button`
  margin-top: 20px;
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

export const ResultsWrapper = styled.div`
  max-width: 274px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
`;
export const SearchResultContainer = styled.div`
  width: 100%;
  background-color: #dde7ee;
  border: 1px solid transparent;
  border-radius: 30px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    background-color: #aac3d4;
  }
`;

export const ResultHeader = styled.div`
  font-size: 14px;
`;

export const UserBadge = styled.div`
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 12px;
  background-color: #ff5252;
  cursor: pointer;

  &:hover {
    background-color: #ff0000;
  }
`;
