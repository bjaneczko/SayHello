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
} from '../search/Search.styled';

const Search = ({
  showSearch,
  setShowSearch,
  search,
  setSearch,
  handleSearch,
  loading,
  searchResults,
  accessChat,
}) => {
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
              {/* <Button onClick={handleSearch}>Go</Button> */}
            </InputContainer>
            {loading
              ? 'Loading...'
              : searchResults?.map((user) => (
                  <SearchResultContainer
                    key={user._id}
                    onClick={() => accessChat(user._id)}
                  >
                    <ResultHeader>{user.name}</ResultHeader>
                    <ResultText>{user.email}</ResultText>
                  </SearchResultContainer>
                ))}
          </SearchContent>
        </SearchWrapper>
      ) : null}
    </>
  );
};

export default Search;
