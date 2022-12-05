import styled from '@emotion/styled';

export const SearchWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 1rem;
`;

export const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: #bdcfdb;
  border: 1px solid transparent;
  border-radius: 1rem;
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

export const SearchResultContainer = styled.div`
  width: 100%;
  background-color: #bdcfdb;
  border-radius: 1rem;
  padding: 0.75rem 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: #222831;

  &:hover {
    background-color: #007980;
    color: white;
  }
  &:active {
    background-color: #007980;
    color: white;
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
