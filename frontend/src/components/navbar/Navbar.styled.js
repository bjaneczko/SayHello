import styled from "@emotion/styled";

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background-color: white;
`;

export const NewChatButton = styled.button`
  height: 100%;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: white;
  font-size: 1rem;
  padding: 0 20px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const IconContainer = styled.div`
  margin: 2px 0 0;
`;

export const InformationContainer = styled.div`
  display: flex;
`;

export const InformationModal = styled.button`
  height: 100%;
  border: none;
  background-color: white;

  font-size: 1.5rem;
  padding: 5px 20px 0;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
