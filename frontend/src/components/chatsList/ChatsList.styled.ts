import styled from '@emotion/styled';

interface ChatsListStyleProps {
  selectedChat?: boolean;
  isSelected?: boolean;
}

export const ChatsContainer = styled.div`
  @media (max-width: 760px) {
    display: ${(props: ChatsListStyleProps) =>
      props.selectedChat ? 'none' : 'flex'};
    padding: 20px;
    border: none;
    border-radius: 0;
    height: 100%;
    max-width: 760px;
  }

  max-width: 500px;
  display: flex;
  flex-direction: column;
  background: #0e1d29;
  border-radius: 1rem;
  border: 5px solid #1c2a34;
  padding: 40px;
  flex: 1;
  color: white;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

export const Button = styled.button`
  height: 100%;
  background-color: #00adb5;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.5rem;
  color: white;
  padding: 0.7rem 1.5rem;

  &:hover {
    cursor: pointer;
    background-color: #009199;
  }
`;

export const HeaderText = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

export const Chats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const ChatCard = styled.div`
  border: 1px solid transparent;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  background: ${(props: ChatsListStyleProps) =>
    props.isSelected ? ' #007980' : '#00494d'};

  &:hover {
    cursor: pointer;
  }
`;
