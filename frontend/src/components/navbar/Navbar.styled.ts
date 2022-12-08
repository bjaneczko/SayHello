import styled from '@emotion/styled';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #0e1d29;
  border-bottom: 5px solid #1c2a34;
`;

export const LogoContainer = styled.div`
  @media (max-width: 760px) {
    padding: 0 20px;
  }
  display: flex;
  align-items: center;
  padding: 0 40px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.1em;
`;

export const InformationContainer = styled.div`
  @media (max-width: 760px) {
    padding: 10px 0px;
  }
  display: flex;
  padding: 10px 20px;
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
