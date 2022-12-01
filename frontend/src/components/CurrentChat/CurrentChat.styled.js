import styled from '@emotion/styled';

export const CurrentChatContainer = styled.div`
  @media (max-width: 760px) {
    display: ${(props) => (props.selectedChat ? 'flex' : 'none')};
  }
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #0e1d29;
  border-radius: 1rem;
  border: 5px solid #1c2a34;
  padding: 40px;
  color: white;
`;
