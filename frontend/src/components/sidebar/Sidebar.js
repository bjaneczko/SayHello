import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

import {
  Background,
  SidebarContent,
  SidebarWrapper,
  InputContainer,
  SearchInput,
  Button,
  SearchResultContainer,
  ResultHeader,
  ResultText,
} from "../sidebar/Sidebar.styled";

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
  const sidebarRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    transform: showSidebar ? `translateX(0%)` : `translateX(-100%)`,
  });

  const closeSidebar = (e) => {
    if (sidebarRef.current === e.target) {
      setShowSidebar(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showSidebar) {
        setShowSidebar(false);
        console.log("I pressed");
      }
    },
    [setShowSidebar, showSidebar]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showSidebar ? (
        <Background onClick={closeSidebar} ref={sidebarRef}>
          <animated.div style={animation}>
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
                  ? "Loading..."
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
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

export default Sidebar;
