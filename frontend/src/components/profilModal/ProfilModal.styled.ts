import styled from '@emotion/styled';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  z-index: 5;
  position: fixed;
  top: 65px;
  display: flex;
  justify-content: end;
`;

export const ModalWrapper = styled.div`
  background: #0e1d29;
  color: white;
  position: relative;
  border: 5px solid #1c2a34;
  border-top: none;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  padding: 1rem 2rem;
`;

export const ModalHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const LogoutButton = styled.button`
  background-color: #00adb5;
  border-radius: 1rem;
  border: none;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  color: white;
  padding: 12px 24px;
  z-index: 1;

  &:focus,
  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: #009199;
  }
`;
