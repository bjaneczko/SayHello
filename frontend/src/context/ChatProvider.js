import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = {
      _id: "637773ad37a3be969c0042d8",
      name: "test",
      email: "test@test.com",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzc3M2FkMzdhM2JlOTY5YzAwNDJkOCIsImlhdCI6MTY2ODc3Mjc4MywiZXhwIjoxNjcxMzY0NzgzfQ.NXIEKdPS65ffp8JfOFixU3pSniEUsocnXCE4OKM0_Gk",
    };
    setUser(userInfo);
    console.log(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
