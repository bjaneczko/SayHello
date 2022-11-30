import styled from '@emotion/styled';

export const CurrentChatContainer = styled.div`
  @media (max-width: 760px) {
    display: ${(props) => (props.selectedChat ? 'flex' : 'none')};
  }
  display: flex;
  flex-direction: column;
  background: white;
  flex: 1;
  border-radius: 30px;
  padding: 40px;
`;
