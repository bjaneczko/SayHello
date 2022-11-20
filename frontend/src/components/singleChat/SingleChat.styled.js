import styled from "@emotion/styled";

export const ChatHeader = styled.div`
  font-size: 24px;
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatButton = styled.button`
  @media (max-width: 760px) {
    display: flex;
  }
  display: ${(props) => (props.hideOnMobile ? "none" : "flex")};
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

export const InfomationContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const InformationText = styled.div`
  font-size: 24px;
  text-align: center;
`;

export const MessagesContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  background: #E8E8E8;
  border-radius: 20px;
  overflowY="hidden";
`;
