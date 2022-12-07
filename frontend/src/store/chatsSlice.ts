import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Chats {
  chats: Object[];
  selectedChat: Object[] | null;
}

const initialState: Chats = {
  chats: [],
  selectedChat: null,
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Object[]>) => {
      state.chats = action.payload;
    },
    setSelectedChat: (state, action: PayloadAction<Object[] | null>) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { setChats, setSelectedChat } = chatsSlice.actions;

export default chatsSlice.reducer;
