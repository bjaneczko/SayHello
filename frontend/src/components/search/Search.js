import React from 'react';

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
} from '../search/Search.styled';

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
  setSelectedUsers,
  setGroupChatName,
}) => {
  //TODO Add formik
  return (
    <>
      {showSearch ? (
        <SearchWrapper showSearch={showSearch}>
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
              {selectedUsers?.map((user) => (
                <UserBadge key={user._id} onClick={() => handleDelete(user)}>
                  {user.name} x
                </UserBadge>
              ))}
            </ResultsWrapper>
            {loading
              ? 'Loading...'
              : searchResults?.map((user) => (
                  <SearchResultContainer
                    key={user._id}
                    onClick={() => handleGroup(user)}
                  >
                    <ResultHeader>{user.name}</ResultHeader>
                    <ResultText>{user.email}</ResultText>
                  </SearchResultContainer>
                ))}
          </SearchContent>
          <Button onClick={handleSubmit}>Create chat</Button>
        </SearchWrapper>
      ) : null}
    </>
  );
};

export default Search;
