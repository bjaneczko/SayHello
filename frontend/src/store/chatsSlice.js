import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  selectedChat: null,
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
  },
});

export const { setChats, setSelectedChat } = chatsSlice.actions;

export default chatsSlice.reducer;
