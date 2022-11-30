import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';

import {
  SidebarContent,
  SidebarWrapper,
  InputContainer,
  SearchInput,
  Button,
  SearchResultContainer,
  ResultHeader,
  ResultText,
} from '../sidebar/Sidebar.styled';

const Sidebar = ({
  showSidebar,
  setShowSidebar,
  search,
  setSearch,
  handleSearch,
  loading,
  searchResults,
  accessChat,
}) => {
  return (
    <>
      {showSidebar ? (
        <SidebarWrapper showSidebar={showSidebar}>
          <SidebarContent>
            <InputContainer>
              <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email"
              />
              <Button onClick={handleSearch}>Go</Button>
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
          </SidebarContent>
        </SidebarWrapper>
      ) : null}
    </>
  );
};

export default Sidebar;
