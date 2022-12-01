import styled from '@emotion/styled';

export const ChatHeader = styled.div`
  font-size: 24px;
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatButton = styled.button`
  @media (max-width: 760px) {
    display: flex;
  }
  display: ${(props) => (props.hideOnMobile ? 'none' : 'flex')};
  background-color: #00adb5;
  border-radius: 30px;
  border: none;
  color: white;
  padding: 16px 20px;
  cursor: pointer;

  &:focus,
  &:hover {
    background-color: #009199;
  }

  &:active {
    background-color: #009199;
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
  background: #9cb7c9;
  border-radius: 1rem;
  overflow-y: hidden;
`;

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
`;

export const FormInput = styled.input`
  background-color: #bdcfdb;
  border: 1px solid transparent;
  border-radius: 1rem 0 0 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  padding: 0.75rem 1rem;
  flex: 1;

  &:focus,
  &:active {
    box-shadow: none;
    outline: none;
  }
`;

export const Button = styled.button`
  height: 100%;
  background-color: #bdcfdb;
  border-radius: 0 1rem 1rem 0;
  border: none;
  font-size: 1.6rem;
  color: black;
  padding: 0.3rem 0.8rem 0;
  z-index: 1;
  cursor: pointer;

  &:focus,
  &:hover,
  &:active {
  }
`;
