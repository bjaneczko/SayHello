import React from 'react';
import { User } from '../../types/types';

import {
  SearchContent,
  SearchWrapper,
  InputContainer,
  SearchInput,
  Button,
  SearchResultContainer,
  ResultHeader,
  ResultText,
  ResultsWrapper,
  UserBadge,
} from './Search.styled';

interface SearchProps {
  showSearch: boolean;
  search: string;
  setSearch: Function;
  loading: boolean;
  searchResults: User[];
  handleSubmit: Function;
  handleGroup: Function;
  handleDelete: Function;
  selectedUsers: User[];
  setGroupChatName: Function;
}

const Search = ({
  showSearch,
  search,
  setSearch,
  loading,
  searchResults,
  handleSubmit,
  handleGroup,
  handleDelete,
  selectedUsers,
  setGroupChatName,
}: SearchProps) => {
  //TODO Add formik
  return (
    <>
      {showSearch ? (
        <SearchWrapper>
          <SearchContent>
            <InputContainer>
              <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email"
              />
            </InputContainer>
            {selectedUsers?.length > 1 && (
              <InputContainer>
                <SearchInput
                  type="text"
                  placeholder="Group chat name"
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </InputContainer>
            )}
            <ResultsWrapper>
              {selectedUsers?.map((user: User) => (
                <UserBadge key={user._id} onClick={() => handleDelete(user)}>
                  {user.name} x
                </UserBadge>
              ))}
            </ResultsWrapper>
            {loading
              ? 'Loading...'
              : searchResults?.map((user: User) => (
                  <SearchResultContainer
                    key={user._id}
                    onClick={() => handleGroup(user)}
                  >
                    <ResultHeader>{user.name}</ResultHeader>
                    <ResultText>{user.email}</ResultText>
                  </SearchResultContainer>
                ))}
          </SearchContent>
          <Button onClick={() => handleSubmit()}>Create chat</Button>
        </SearchWrapper>
      ) : null}
    </>
  );
};

export default Search;
