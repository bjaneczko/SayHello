import styled from '@emotion/styled';

export const SearchWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
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

export const ResultsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
`;

export const UserBadge = styled.div`
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 12px;
  background-color: #bdcfdb;
  color: black;
  cursor: pointer;

  &:hover {
    background-color: #ff0000;
  }
`;

export const Button = styled.button`
  width: 100%;
  background-color: #00adb5;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.5rem;
  color: white;
  padding: 0.7rem 1.5rem;

  &:hover {
    cursor: pointer;
    background-color: #009199;
  }
`;
