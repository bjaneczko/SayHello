import styled from "@emotion/styled";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
`;

export const SidebarWrapper = styled.div`
  width: 300px;
  height: 100%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  z-index: 10;
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
`;

export const SearchInput = styled.input`
  position: absolute;
  left: 10px;
  background-color: #dde7ee;
  border: 1px solid transparent;
  border-radius: 30px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  padding: 0.75rem 1rem;
  z-index: 2;

  &:focus,
  &:active {
    box-shadow: none;
    outline: none;
  }
`;

export const InputContainer = styled.div`
  margin-top: 20px;
  height: 50px;
  display: flex;
`;

export const Button = styled.button`
  position: absolute;
  right: 10px;
  background-color: #0083b0;
  border-radius: 30px;
  border: none;
  text-align: center;
  font-size: 1rem;
  color: white;
  padding: 16px 1rem 16px 4rem;
  z-index: 1;

  &:focus,
  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: #007399;
  }
`;

export const SearchResultContainer = styled.div`
  width: 250px;
  margin-top: 1rem;
  background-color: #dde7ee;
  border: 1px solid transparent;
  border-radius: 30px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
    background-color: #0083b0;
    color: white;
  }
  &:active {
    background-color: #007399;
  }
`;

export const ResultHeader = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const ResultText = styled.div`
  font-size: 12px;
`;
