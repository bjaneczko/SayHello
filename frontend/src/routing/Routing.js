import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ChatPage from "../pages/ChatPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chats" element={<ChatPage />} />
    </Routes>
  );
};

export default Routing;
