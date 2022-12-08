import { createSlice } from '@reduxjs/toolkit';

interface Chats {
  chats: any;
  selectedChat: any;
  notification: any;
}

const initialState: Chats = {
  chats: [],
  selectedChat: null,
  notification: [],
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = initialState.notification;
    },
  },
});

export const { setChats, setSelectedChat, setNotification, clearNotification } =
  chatsSlice.actions;

export default chatsSlice.reducer;
