import styled from "@emotion/styled";
import { MdClose } from "react-icons/md";

export const ModalContainer = styled.div`
  position: absolute;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  z-index: 10;
  border-radius: 10px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  padding: 5rem 2rem 2rem;
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

export const ResultsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
  margin: 10px 0;
`;

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
`;

export const FormInput = styled.input`
  background-color: rgb(245, 248, 250);
  border: 1px solid transparent;
  border-radius: 30px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  padding: 0.75rem 1rem;
  flex: 1;

  &:focus,
  &:active {
    box-shadow: none;
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #0083b0;
  border-radius: 30px;
  border: none;
  color: white;
  padding: 16px 20px;
  cursor: pointer;

  &:focus,
  &:hover {
    background-color: #007399;
  }

  &:active {
    background-color: #007399;
  }
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
