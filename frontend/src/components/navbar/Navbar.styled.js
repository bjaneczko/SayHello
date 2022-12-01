import styled from '@emotion/styled';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background-color: #0e1d29;
  border-bottom: 5px solid #1c2a34;
`;

export const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 40px;
`;

export const InformationContainer = styled.div`
  display: flex;
  padding: 0 20px;
  background: ;
`;

export const InformationModal = styled.button`
  height: 100%;
  border: none;
  color: #00adb5;
  font-size: 2rem;
  padding: 5px 20px 0;
  cursor: pointer;
  background: none;

  &:active,
  &:focus,
  &:hover {
    color: #00adb5;
  }
`;
