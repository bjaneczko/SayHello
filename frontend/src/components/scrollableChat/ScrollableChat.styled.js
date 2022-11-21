import styled from "@emotion/styled";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 5px;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Message = styled.div`
  background: ${(props) => (props.isSender ? "#BEE3F8" : "#B9F5D0")};
  margin-left: ${(props) => (props.isSender ? "auto" : "0")};
  border-radius: 20px;
  padding: 5px 15px;
  width: fit-content;
`;
