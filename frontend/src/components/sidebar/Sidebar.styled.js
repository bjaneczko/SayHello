import styled from '@emotion/styled';

export const SidebarWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 1rem;
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: #dde7ee;
  border: 1px solid transparent;
  border-radius: 1rem 0 0 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  padding: 0.7rem 1.5rem;

  &:focus,
  &:active {
    box-shadow: none;
    outline: none;
  }
`;

export const InputContainer = styled.div`
  display: flex;
`;

export const Button = styled.button`
  background-color: #705df2;
  border-radius: 0 1rem 1rem 0;
  border: none;
  font-size: 1rem;
  color: white;
  padding: 0.7rem 1.5rem;
  z-index: 1;
  cursor: pointer;

  &:focus,
  &:hover,
  &:active {
    background-color: #4e41a9;
  }
`;

export const SearchResultContainer = styled.div`
  width: 100%;
  background-color: #dde7ee;
  border: 1px solid transparent;
  border-radius: 1rem;
  padding: 0.75rem 0;
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
  padding: 0 1rem;
  font-size: 14px;
  font-weight: 600;
`;

export const ResultText = styled.div`
  padding: 0 1rem;
  font-size: 12px;
`;
