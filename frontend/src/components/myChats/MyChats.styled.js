import styled from "@emotion/styled";

export const ChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 30px;
  padding: 40px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
`;

export const HeaderButton = styled.button`
  background-color: #0083b0;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  color: white;
  padding: 16px 40px;

  &:focus,
  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: #007399;
  }
`;

export const HeaderText = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export const Chats = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const ChatCard = styled.div`
  margin-top: 1rem;
  border: 1px solid transparent;
  border-radius: 30px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
`;

export const ChatUser = styled.p``;
